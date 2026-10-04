import { writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getPublishedPosts } from '../src/data/blogPosts.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectDir = resolve(__dirname, '..');
const distDir = resolve(projectDir, 'dist');
const publicDir = resolve(projectDir, 'public');
const BASE = 'https://centerpiecehookahlounge.com';

const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/menu', priority: '0.9', changefreq: 'weekly' },
  { path: '/who-we-are', priority: '0.9', changefreq: 'monthly' },
  { path: '/premium-hookah', priority: '0.9', changefreq: 'monthly' },
  { path: '/visit-us', priority: '0.9', changefreq: 'monthly' },
  { path: '/private-events', priority: '0.9', changefreq: 'monthly' },
  { path: '/build-my-hookah', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
];

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

async function main() {
  if (!existsSync(distDir)) {
    console.error('✗ dist/ not found. Run "vite build" first.');
    process.exit(1);
  }

  const posts = getPublishedPosts();
  const today = todayISO();

  const urls = [];

  for (const page of STATIC_PAGES) {
    urls.push(`  <url>
    <loc>${BASE}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`);
  }

  for (const post of posts) {
    const lastmod = post.updatedDate ?? post.publishDate;
    urls.push(`  <url>
    <loc>${BASE}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  await writeFile(resolve(distDir, 'sitemap.xml'), sitemap, 'utf8');
  console.log(`✓ Wrote dist/sitemap.xml (${STATIC_PAGES.length + posts.length} URLs)`);

  const baseLlm = await readFile(resolve(publicDir, 'llm.txt'), 'utf8');
  const blogSection = posts.length > 0
    ? `\n## Blog Articles\n\n${posts.map((p) => `- [${p.title}](${BASE}/blog/${p.slug}): ${p.quickAnswer ?? p.excerpt}`).join('\n')}\n`
    : '';

  await writeFile(resolve(distDir, 'llm.txt'), baseLlm.trimEnd() + '\n' + blogSection, 'utf8');
  console.log(`✓ Wrote dist/llm.txt (${posts.length} blog articles)`);
}

main().catch((err) => {
  console.error('✗ generate-sitemap failed:', err);
  process.exit(1);
});
