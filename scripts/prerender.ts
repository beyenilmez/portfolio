/**
 * Prerender script -- build-time static HTML generation.
 *
 * Produces dist/index.html (EN) and dist/tr/index.html (TR) with:
 * - Server-rendered React app HTML inside #root
 * - Locale-specific SEO <head> tags (title, meta, OG, Twitter, hreflang, JSON-LD)
 * - Correct <html lang> attribute per locale
 *
 * Also generates dist/sitemap.xml and dist/robots.txt.
 *
 * Run after: vite build (client) + vite build --ssr (server)
 * Usage: node --experimental-strip-types scripts/prerender.ts
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');
const serverDir = path.resolve(__dirname, '..', 'dist-server');

// --- Helpers ---

/** Escape characters that are meaningful in HTML attributes */
function escapeAttr(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// --- Main ---

async function main() {
  // 1. Read template ONCE before the locale loop (template overwrite race)
  const templatePath = path.join(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found: ${templatePath}. Run "pnpm build:client" first.`);
  }
  const template = fs.readFileSync(templatePath, 'utf-8');

  // Validate markers
  if (!template.includes('<!--ssr-outlet-->')) {
    throw new Error('Template missing <!--ssr-outlet--> marker in <div id="root">');
  }
  if (!template.includes('<!--head-outlet-->')) {
    throw new Error('Template missing <!--head-outlet--> marker in <head>');
  }

  // 2. Inline critical CSS: find the main CSS bundle, read its contents,
  //    and inject as an inline <style> tag in <head>. This eliminates the
  //    render-blocking CSS request that gates mobile LCP (brand wordmark).
  //    The external <link> is converted to async load for cache warmth.
  const assetsDir = path.join(distDir, 'assets');
  let inlineCss = '';
  let cssFilename = '';
  if (fs.existsSync(assetsDir)) {
    const cssFiles = fs.readdirSync(assetsDir).filter((f) => /^index-.+\.css$/.test(f));
    if (cssFiles.length === 1) {
      cssFilename = cssFiles[0];
      inlineCss = fs.readFileSync(path.join(assetsDir, cssFilename), 'utf-8');
      console.log(`  Inlining CSS: ${cssFilename} (${(inlineCss.length / 1024).toFixed(1)} KB)`);
    }
  }

  // 3. Import server bundle (compiled JS, not .tsx source)
  const serverEntry = path.join(serverDir, 'entry-server.js');
  if (!fs.existsSync(serverEntry)) {
    throw new Error(`Server bundle not found: ${serverEntry}. Run "pnpm build:server" first.`);
  }
  const { render, content } = await import(pathToFileURL(serverEntry).href);

  // 4. Define locales and output paths
  const baseUrl = 'https://bedirhanyenilmez.com';
  const locales = [
    { locale: 'en' as const, outPath: path.join(distDir, 'index.html'), lang: 'en' },
    { locale: 'tr' as const, outPath: path.join(distDir, 'tr', 'index.html'), lang: 'tr' },
  ];

  // 5. Build and write locale-specific HTML
  for (const { locale, outPath, lang } of locales) {
    const appHtml = render(locale);
    const headTags = buildHeadTags(locale, baseUrl, content);

    let html = template;
    html = html.replace('lang="en"', `lang="${lang}"`);
    // Strip dev-mode default title — prerender injects locale-specific title
    html = html.replace(/<title>.*?<\/title>\n?/, '');

    // Inject inline critical CSS before the head outlet
    if (inlineCss) {
      html = html.replace(
        '<!--head-outlet-->',
        `<style>${inlineCss}</style>\n  <!--head-outlet-->`,
      );
    }

    html = html.replace('<!--head-outlet-->', headTags);
    html = html.replace('<!--ssr-outlet-->', appHtml);

    // Defer the external CSS link: load async to avoid render-blocking.
    // The inline <style> above covers first paint; this warms the cache.
    if (cssFilename) {
      html = html.replace(
        new RegExp(`<link rel="stylesheet"[^>]*href="/assets/${cssFilename}"[^>]*>`, 'g'),
        `<link rel="stylesheet" href="/assets/${cssFilename}" media="print" onload="this.media='all'" crossorigin>`,
      );
    }

    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html);
    console.log(`  Written: ${path.relative(process.cwd(), outPath)}`);
  }

  // 5. Generate sitemap.xml
  const sitemap = generateSitemap(baseUrl);
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
  console.log('  Written: dist/sitemap.xml');

  // 6. Generate robots.txt
  const robots = generateRobotsTxt(baseUrl);
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robots);
  console.log('  Written: dist/robots.txt');

  console.log('Prerender complete.');
}

// --- SEO Head Tag Builder ---

function buildHeadTags(
  locale: 'en' | 'tr',
  baseUrl: string,
  content: {
    links: { email: string; github: string; linkedin: string; photo: string };
    i18n: {
      hero: {
        name: string;
        role: { en: string; tr: string };
        roleMobile: { en: string; tr: string };
        heroTitle: { en: string; tr: string };
        heroDesc: { en: string; tr: string };
      };
    };
    education: Array<{ school: { en: string; tr: string } }>;
  },
): string {
  const isEn = locale === 'en';
  const url = isEn ? `${baseUrl}/` : `${baseUrl}/tr/`;
  const altUrl = isEn ? `${baseUrl}/tr/` : `${baseUrl}/`;
  const altLocale = isEn ? 'tr' : 'en';

  const name = content.i18n.hero.name;
  const title = `${name} - ${content.i18n.hero.roleMobile[locale]}`;
  const description = content.i18n.hero.heroDesc[locale];
  // og:image points at the per-locale OG card PNG generated by scripts/og-image.tsx.
  // Twitter requires absolute URL — the baseUrl template produces the absolute URL.
  const imageUrl = escapeAttr(`${baseUrl}/og-${locale}.png`);

  // JSON-LD Person schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    url: baseUrl,
    jobTitle: content.i18n.hero.roleMobile[locale],
    sameAs: [content.links.github, content.links.linkedin],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: content.education[0]?.school?.en ?? 'Dokuz Eylul University',
    },
    knowsLanguage: ['en', 'tr'],
    image: imageUrl,
    email: `mailto:${content.links.email}`,
  };

  return `
    <title>${escapeAttr(title)}</title>
    <meta name="description" content="${escapeAttr(description)}" />
    <link rel="canonical" href="${url}" />
    <link rel="alternate" hreflang="${locale}" href="${url}" />
    <link rel="alternate" hreflang="${altLocale}" href="${altUrl}" />
    <link rel="alternate" hreflang="x-default" href="${baseUrl}/" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${escapeAttr(title)}" />
    <meta property="og:description" content="${escapeAttr(description)}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:locale" content="${isEn ? 'en_US' : 'tr_TR'}" />
    <meta property="og:locale:alternate" content="${isEn ? 'tr_TR' : 'en_US'}" />
    <meta property="og:site_name" content="${escapeAttr(name)}" />

    <!-- Twitter Card -->
    <!-- summary_large_image required for full 1200x630 OG preview on Twitter/X -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(title)}" />
    <meta name="twitter:description" content="${escapeAttr(description)}" />
    <meta name="twitter:image" content="${imageUrl}" />

    <!-- JSON-LD Person Schema -->
    <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
    </script>`;
}

// --- Sitemap ---

function generateSitemap(baseUrl: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${baseUrl}/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/" />
    <xhtml:link rel="alternate" hreflang="tr" href="${baseUrl}/tr/" />
  </url>
  <url>
    <loc>${baseUrl}/tr/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/" />
    <xhtml:link rel="alternate" hreflang="tr" href="${baseUrl}/tr/" />
  </url>
</urlset>`;
}

// --- Robots ---

function generateRobotsTxt(baseUrl: string): string {
  return `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;
}

// --- Run ---

main().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
