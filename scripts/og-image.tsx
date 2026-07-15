/** @jsxRuntime automatic */
/** @jsxImportSource react */
/**
 * OG image generator — build-time editorial card per locale.
 *
 * Reads:  scripts/og-fonts/Fraunces-Medium.ttf
 *         scripts/og-fonts/JetBrainsMono-Regular.ttf
 *         dist-server/entry-server.js (SSR-bundled content — see below)
 * Writes: dist/og-en.png / dist/og-tr.png
 *
 * Pipeline: JSX → satori → SVG string → Resvg → PNG buffer → file.
 *
 * ## Fonts
 * Satori requires .ttf/.otf/.woff — NOT .woff2 (Fontsource ships only woff2).
 * Static cuts committed to scripts/og-fonts/ from upstream font releases.
 *
 * Standalone satori + resvg-js works in Node. This script runs after
 * build:server + prerender in the build chain
 * (client → server → prerender → og-image).
 *
 * ## Why the SSR bundle
 * src/config/content.ts contains vite-imagetools `?as=picture` imports that only
 * Vite's plugin can resolve. tsx/Node cannot resolve the query suffix at runtime,
 * so a direct import of content.ts would crash with ERR_MODULE_NOT_FOUND. We mirror
 * prerender.ts's strategy and dynamically import the SSR-bundled entry, which exports
 * content with all imagetools imports already resolved into URL strings.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
// Type-only import so tsc -b can verify our usage of content.i18n.hero.* against the
// real source-of-truth shape, while the value `content` is loaded at runtime from the
// SSR bundle (see header comment).
import type { SiteContent } from '../src/config/content';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');
const distServerDir = path.resolve(__dirname, '..', 'dist-server');
const fontsDir = path.resolve(__dirname, 'og-fonts');

type Locale = 'en' | 'tr';

async function loadFonts() {
  // Satori loads raw .ttf/.otf/.woff only. Static cuts committed from upstream:
  //   Fraunces: https://github.com/undercasetype/Fraunces/releases
  //   JetBrains Mono: https://github.com/JetBrains/JetBrainsMono/releases
  const fraunces = await readFile(path.join(fontsDir, 'Fraunces-Medium.ttf'));
  const jbm = await readFile(path.join(fontsDir, 'JetBrainsMono-Regular.ttf'));
  return [
    { name: 'Fraunces', data: fraunces, weight: 500 as const, style: 'normal' as const },
    { name: 'JetBrains Mono', data: jbm, weight: 400 as const, style: 'normal' as const },
  ];
}

async function loadContent(): Promise<SiteContent> {
  // Mirrors prerender.ts:56 -- dynamic import of the SSR-bundled entry, which
  // exports `content` with all `?as=picture` imagetools imports already resolved.
  const serverEntry = path.join(distServerDir, 'entry-server.js');
  if (!existsSync(serverEntry)) {
    throw new Error(
      `SSR bundle not found at ${serverEntry}. Run pnpm build:server (or pnpm build) first.`,
    );
  }
  const mod = (await import(pathToFileURL(serverEntry).href)) as { content: SiteContent };
  return mod.content;
}

function ogCard(locale: Locale, content: SiteContent) {
  const eyebrow = locale === 'tr' ? 'Portfolyo' : 'Portfolio';
  const name = content.i18n.hero.name; // 'Bedirhan Yenilmez'
  const [first, last] = name.split(' '); // 2-line stack

  // Editorial dark canvas. Satori CSS subset: flexbox-only (Yoga), no calc(), no z-index.
  // Use literal hex everywhere (CSS custom properties not fully honored).
  return (
    <div
      style={{
        width: 1200,
        height: 630,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        background: '#0e0c0a', // bg-dark token (matches index.html:48 inline style)
        fontFamily: 'Fraunces',
        position: 'relative',
      }}
    >
      {/* Top row: eyebrow left, brass dot right */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: 30,
            letterSpacing: 1.5,
            color: '#f5ecdc',
            opacity: 0.6,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            width: 12,
            height: 12,
            background: '#e0b684', // brass accent
          }}
        />
      </div>

      {/* Name two-line stack + brass accent rule + role */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 96, lineHeight: 1.05, color: '#f5ecdc', display: 'flex' }}>
          {first}
        </div>
        <div style={{ fontSize: 96, lineHeight: 1.05, color: '#f5ecdc', display: 'flex' }}>
          {last}
        </div>
        <div
          style={{
            width: 120,
            height: 2,
            background: '#e0b684', // brass accent
            marginTop: 24,
          }}
        />
        <div
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: 26,
            color: '#d4c9b5', // between ink-on-dark and mute-on-dark
            marginTop: 16,
          }}
        >
          {content.i18n.hero.roleMobile[locale]}
        </div>
      </div>

      {/* URL bottom-right — JBM, mute-on-dark */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          fontFamily: 'JetBrains Mono',
          fontSize: 20,
          color: '#b8ad9b', // mute-on-dark
        }}
      >
        bedirhanyenilmez.com
      </div>
    </div>
  );
}

async function renderLocale(
  locale: Locale,
  fonts: Awaited<ReturnType<typeof loadFonts>>,
  content: SiteContent,
) {
  const svg = await satori(ogCard(locale, content), {
    width: 1200,
    height: 630,
    fonts,
  });
  const png = new Resvg(svg, { background: '#0e0c0a' }).render().asPng();
  const outPath = path.join(distDir, `og-${locale}.png`);
  await writeFile(outPath, png);
  console.log(`  Written: ${path.relative(process.cwd(), outPath)}`);
}

async function main() {
  // dist/ must exist (created by build:client + prerender chain).
  if (!existsSync(distDir)) {
    throw new Error(
      `dist/ not found at ${distDir}. Run pnpm build (which chains build:client && build:server && prerender first).`,
    );
  }
  await mkdir(distDir, { recursive: true });
  const [fonts, content] = await Promise.all([loadFonts(), loadContent()]);
  await renderLocale('en', fonts, content);
  await renderLocale('tr', fonts, content);
  console.log('OG images generated.');
}

main().catch((err) => {
  console.error('OG generation failed:', err);
  process.exit(1);
});
