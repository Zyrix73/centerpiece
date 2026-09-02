// Fetches Drinks from the Cloudflare Worker API and writes them to
// src/data/drinks.json so they are baked into the build at compile time.
//
// NOTE: Editing the D1 database alone does NOT update the live site — the site
// only picks up new drinks on the next deploy, which re-runs this prebuild script.
import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const API_URL = 'https://centerpiece-mixes.zyrix2021.workers.dev/api/drinks';
const OUTPUT = resolve('src/data/drinks.json');

async function main() {
  try {
    const res = await fetch(API_URL, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const drinks = Array.isArray(data) ? data : (data.drinks ?? data.items ?? []);
    if (!Array.isArray(drinks) || drinks.length === 0) {
      throw new Error('Empty or invalid drinks array');
    }

    let localExtras = [];
    if (existsSync(OUTPUT)) {
      try {
        const existing = JSON.parse(await readFile(OUTPUT, 'utf8'));
        const apiNames = new Set(drinks.map((d) => d.name));
        localExtras = (existing.drinks ?? []).filter((d) => !apiNames.has(d.name));
      } catch {}
    }

    const filtered = drinks.filter((d) => !/mexican/i.test(d.name ?? ''));

    const allDrinks = [
      ...filtered.map((item) => ({
        name: item.name ?? '',
        desc: item.desc ?? item.description ?? '',
        price: typeof item.price === 'number' ? `${item.price}` : (item.price ?? ''),
        type: item.type ?? '',
        category: item.category ?? '',
        featured: Boolean(item.featured),
        image_url: item.image_url ?? (item.name === 'Turkish Coffee' ? 'https://pub-503bdcef50f44f499fb98ef82b72d6db.r2.dev/Menu/turkish-coffee%20(2).webp' : null),
      })),
      ...localExtras.filter((d) => !/mexican/i.test(d.name ?? '')),
    ];

    const normalized = { count: allDrinks.length, drinks: allDrinks };

    await mkdir(dirname(OUTPUT), { recursive: true });
    await writeFile(OUTPUT, JSON.stringify(normalized, null, 2) + '\n', 'utf8');
    console.log(`✓ Fetched ${filtered.length} drinks + ${localExtras.filter((d) => !/mexican/i.test(d.name ?? '')).length} local → ${OUTPUT}`);
  } catch (err) {
    console.warn(`⚠  Could not fetch drinks (${err.message}). Keeping existing src/data/drinks.json if present.`);
    if (!existsSync(OUTPUT)) {
      console.warn('⚠  No existing drinks.json found — the build will have no Drinks section.');
    }
  }
}

main();
