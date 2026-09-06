import { writeFile, readFile, mkdir, copyFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createServer } from 'node:http';
import { resolve, dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '..', 'dist');

const ROUTES = [
  {
    path: '/',
    file: 'index.html',
    title: 'Centerpiece Hookah Lounge | Premium Shisha Bar in Westwood, Los Angeles',
    description: 'Premium hookah lounge in Westwood near UCLA. Study, work, and relax with expertly curated flavors and a quiet atmosphere. Open nightly until 2–4 AM.',
    ogTitle: 'Centerpiece Hookah Lounge | Premium Shisha Bar in Westwood, Los Angeles',
    ogDescription: 'Experience Southern California\'s only experimental hookah lounge in Westwood, West LA. 50+ premium shisha flavors, private seating, and mood-based curation. Open nightly until 2–4 AM.',
    canonical: 'https://centerpiecehookahlounge.com/',
  },
  {
    path: '/menu',
    file: 'menu.html',
    title: 'Hookah Menu | 50+ Shisha Flavors — Centerpiece Hookah Lounge, Westwood',
    description: 'Explore our full hookah menu with 50+ premium shisha flavors, food, snacks, drinks, and tea. Signature blends you won\'t find anywhere else in Westwood, LA.',
    ogTitle: 'Hookah Menu | 50+ Shisha Flavors — Centerpiece Hookah Lounge',
    ogDescription: '50+ premium shisha flavors, food, snacks, drinks, and tea at Centerpiece Hookah Lounge in Westwood, LA.',
    canonical: 'https://centerpiecehookahlounge.com/menu',
  },
  {
    path: '/who-we-are',
    file: 'who-we-are.html',
    title: 'About Us | Founder Story & Craft — Centerpiece Hookah Lounge, Westwood',
    description: 'Meet Mina, founder of Centerpiece Hookah Lounge — 20 years perfecting the craft of premium shisha through mood-based curation and rare flavor experimentation in Westwood, Los Angeles.',
    ogTitle: 'About Us | Founder Story & Craft — Centerpiece Hookah Lounge, Westwood',
    ogDescription: 'Meet Mina, founder of Centerpiece Hookah Lounge — 20 years perfecting the craft of premium shisha through mood-based curation and rare flavor experimentation in Westwood, Los Angeles.',
    canonical: 'https://centerpiecehookahlounge.com/who-we-are',
  },
  {
    path: '/visit-us',
    file: 'visit-us.html',
    title: 'Visit Us | Directions, Parking & Hours — Centerpiece Hookah Lounge',
    description: 'Visit Centerpiece Hookah Lounge at 1446 Westwood Blvd, Los Angeles, CA 90024. Find our hours, directions, parking info, and neighborhoods we serve in West LA.',
    ogTitle: 'Visit Us | Directions, Parking & Hours — Centerpiece Hookah Lounge',
    ogDescription: 'Hours, directions, and parking for Centerpiece Hookah Lounge in Westwood, Los Angeles. Open nightly until 2–4 AM.',
    canonical: 'https://centerpiecehookahlounge.com/visit-us',
  },
  {
    path: '/premium-hookah',
    file: 'premium-hookah.html',
    title: 'Premium Shisha Experience | Private Seating in Westwood, LA',
    description: 'Discover the premium hookah experience at Centerpiece in Westwood — Wookah and Alpha Hookah equipment, dark leaf blends, private seating, and a curated atmosphere unlike any other lounge in LA.',
    ogTitle: 'Premium Shisha Experience | Private Seating in Westwood, LA',
    ogDescription: 'Premium shisha experience with Wookah, Alpha Hookah, and dark leaf blends at Centerpiece Hookah Lounge in Westwood, LA.',
    canonical: 'https://centerpiecehookahlounge.com/premium-hookah',
  },
  {
    path: '/build-my-hookah',
    file: 'build-my-hookah.html',
    title: 'Build My Hookah | Centerpiece Hookah Lounge',
    description: 'Build your custom hookah at Centerpiece Hookah Lounge. Premium add-ons, ice hose, CBD, THC, and signature flavor mixes.',
    ogTitle: 'Build My Hookah | Centerpiece Hookah Lounge',
    ogDescription: 'Build your custom hookah with premium add-ons, ice hose, CBD, THC, and signature flavor mixes at Centerpiece Hookah Lounge.',
    canonical: 'https://centerpiecehookahlounge.com/build-my-hookah',
  },
  {
    path: '/private-events',
    file: 'private-events.html',
    title: 'Private Events, Corporate Parties & Filming Location | Centerpiece Hookah Lounge, Westwood',
    description: 'Book Centerpiece Hookah Lounge in Westwood, Los Angeles for private parties, corporate events, and film or photo productions. Open-floor Moroccan-styled lounge minutes from UCLA. Call Mina at (310) 977-0780 for a custom quote.',
    ogTitle: 'Private Events, Corporate Parties & Filming Location | Centerpiece Hookah Lounge, Westwood',
    ogDescription: 'Book Centerpiece Hookah Lounge in Westwood, Los Angeles for private parties, corporate events, and film or photo productions. Open-floor Moroccan-styled lounge minutes from UCLA. Call Mina at (310) 977-0780 for a custom quote.',
    canonical: 'https://centerpiecehookahlounge.com/private-events',
  },
];

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.ico': 'image/x-icon',
};

function serveDist(port) {
  return new Promise((resolveFn) => {
    const server = createServer(async (req, res) => {
      try {
        let urlPath = decodeURIComponent(req.url.split('?')[0]);
        if (urlPath.endsWith('/')) urlPath = urlPath.slice(0, -1);
        if (urlPath === '') urlPath = '/index.html';
        let filePath = join(distDir, urlPath);

        // Static assets (with file extension) — serve directly
        // SPA routes (no extension) — always serve index.html so JS renders the route
        if (!existsSync(filePath) && !extname(urlPath)) {
          filePath = join(distDir, 'index.html');
        }
        if (!existsSync(filePath)) {
          res.writeHead(404);
          res.end('Not found');
          return;
        }

        const data = await readFile(filePath);
        const ext = extname(filePath);
        res.writeHead(200, { 'Content-Type': MIME[ext] ?? 'application/octet-stream' });
        res.end(data);
      } catch {
        res.writeHead(500);
        res.end('Server error');
      }
    });
    server.listen(port, () => resolveFn(server));
  });
}

async function renderRoute(browser, port, route) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  // Block heavy external resources for speed but allow local assets
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const url = req.url();
    if (url.includes('googletagmanager.com') || url.includes('google-analytics.com')) {
      req.abort();
    } else if (url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com')) {
      req.abort();
    } else {
      req.continue();
    }
  });

  await page.goto(`http://localhost:${port}${route.path}`, { waitUntil: 'networkidle0', timeout: 30000 });
  // Extra wait for any late client-side rendering
  await new Promise((r) => setTimeout(r, 1000));

  const html = await page.content();
  await page.close();
  return html;
}

function injectMeta(html, route) {
  // Replace <title>
  html = html.replace(/<title>.*?<\/title>/s, `<title>${route.title}</title>`);

  // Replace or insert meta description
  const descRegex = /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/;
  if (descRegex.test(html)) {
    html = html.replace(descRegex, `<meta name="description" content="${route.description}" />`);
  }

  // Replace canonical
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${route.canonical}" />`);

  // Replace og:title
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${route.ogTitle}" />`);

  // Replace og:description
  html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${route.ogDescription}" />`);

  // Replace og:url
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${route.canonical}" />`);

  // Replace twitter:title
  html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${route.ogTitle}" />`);

  // Replace twitter:description
  html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${route.ogDescription}" />`);

  return html;
}

async function main() {
  if (!existsSync(distDir)) {
    console.error('✗ dist/ not found. Run "vite build" first.');
    process.exit(1);
  }

  const port = 4399;
  const server = await serveDist(port);
  console.log(`✓ Preview server on :${port}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  try {
    for (const route of ROUTES) {
      process.stdout.write(`  Rendering ${route.path} ... `);
      const html = await renderRoute(browser, port, route);
      const finalHtml = injectMeta(html, route);
      const outPath = resolve(distDir, route.file);
      await mkdir(dirname(outPath), { recursive: true });
      await writeFile(outPath, finalHtml, 'utf8');
      console.log('✓');
    }
    console.log('✓ Prerendered all routes.');
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.error('✗ Prerender failed:', err);
  process.exit(1);
});
