// Fetches Signature Mixes from the Cloudflare Worker API and writes them to
// src/data/mixes.json so they are baked into the build at compile time.
// This makes mix names/descriptions available in the static HTML for SEO/AI crawlers.
//
// NOTE: Editing the D1 database alone does NOT update the live site — the site
// only picks up new mixes on the next deploy, which re-runs this prebuild script.
// This is the intended SEO tradeoff: content ships in the HTML, not fetched at runtime.
import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const API_URL = 'https://centerpiece-mixes.zyrix2021.workers.dev/api/mixes';
const OUTPUT = resolve('src/data/mixes.json');
const R2_BASE = 'https://pub-503bdcef50f44f499fb98ef82b72d6db.r2.dev/mixes/mixes';

function imageUrlFor(name) {
  return `${R2_BASE}/${encodeURIComponent(name)}.webp`;
}

async function main() {
  try {
    const res = await fetch(API_URL, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data || !Array.isArray(data.mixes) || data.mixes.length === 0) {
      throw new Error('Empty or invalid mixes array');
    }
    data.mixes = data.mixes.map((mix) => ({
      ...mix,
      image_url: mix.Image_URL ?? mix.image_url ?? imageUrlFor(mix.name),
    }));
    await mkdir(dirname(OUTPUT), { recursive: true });
    await writeFile(OUTPUT, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`✓ Fetched ${data.count ?? data.mixes.length} mixes → ${OUTPUT}`);
  } catch (err) {
    console.warn(`⚠  Could not fetch mixes (${err.message}). Keeping existing src/data/mixes.json if present.`);
    if (!existsSync(OUTPUT)) {
      console.warn('⚠  No existing mixes.json found — the build will have no Signature Mixes section.');
    }
  }
}

main();
