// Fetches Food & Snacks from the Cloudflare Worker API and writes them to
// src/data/food.json so they are baked into the build at compile time.
//
// NOTE: Editing the D1 database alone does NOT update the live site — the site
// only picks up new food items on the next deploy, which re-runs this prebuild script.
import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const API_URL = 'https://centerpiece-mixes.zyrix2021.workers.dev/api/food';
const OUTPUT = resolve('src/data/food.json');

async function main() {
  try {
    const res = await fetch(API_URL, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const foods = Array.isArray(data) ? data : (data.foods ?? data.items ?? data.food ?? []);
    if (!Array.isArray(foods) || foods.length === 0) {
      throw new Error('Empty or invalid foods array');
    }

    const normalized = {
      count: foods.length,
      foods: foods.map((item) => ({
        name: item.name ?? '',
        desc: item.desc ?? item.description ?? '',
        price: typeof item.price === 'number' ? `$${item.price}` : (item.price ?? ''),
        category: item.category ?? '',
        featured: Boolean(item.featured),
        image_url: item.image_url ?? null,
      })),
    };

    await mkdir(dirname(OUTPUT), { recursive: true });
    await writeFile(OUTPUT, JSON.stringify(normalized, null, 2) + '\n', 'utf8');
    console.log(`✓ Fetched ${normalized.count} food items → ${OUTPUT}`);
  } catch (err) {
    console.warn(`⚠  Could not fetch food (${err.message}). Keeping existing src/data/food.json if present.`);
    if (!existsSync(OUTPUT)) {
      console.warn('⚠  No existing food.json found — the build will have no Food & Snacks section.');
    }
  }
}

main();
