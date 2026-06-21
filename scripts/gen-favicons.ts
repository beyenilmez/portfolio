/**
 * Favicon generator — one-shot script.
 *
 * Reads:  public/favicon.svg
 * Writes: public/favicon.ico       (multi-size: 16+32+48)
 *         public/apple-touch-icon.png  (180x180, opaque background)
 *         public/icon-192.png      (192x192, transparency permitted)
 *         public/icon-512.png      (512x512, transparency permitted)
 *
 * Run:    pnpm gen:favicons
 * When:   Once after editing public/favicon.svg. Outputs are committed to git.
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import toIco from 'to-ico';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '..', 'public');

async function svgToPng(svgString: string, size: number, opaque = false): Promise<Buffer> {
  // Resvg: pure-napi, no native compile. background=#0e0c0a forces opaque
  // canvas for apple-touch-icon (iOS rounds corners, needs no transparency).
  const resvg = new Resvg(svgString, {
    fitTo: { mode: 'width', value: size },
    background: opaque ? '#0e0c0a' : undefined,
  });
  return Buffer.from(resvg.render().asPng());
}

async function main() {
  const svg = await readFile(path.join(publicDir, 'favicon.svg'), 'utf-8');

  // Apple touch icon -- 180x180, opaque (iOS rounds the canvas).
  const apple = await svgToPng(svg, 180, /* opaque */ true);
  await writeFile(path.join(publicDir, 'apple-touch-icon.png'), apple);

  // Manifest icons -- with transparency.
  const icon192 = await svgToPng(svg, 192);
  await writeFile(path.join(publicDir, 'icon-192.png'), icon192);

  const icon512 = await svgToPng(svg, 512);
  await writeFile(path.join(publicDir, 'icon-512.png'), icon512);

  // ICO multi-size (16, 32, 48). sharp/resvg cannot emit ICO containers;
  // to-ico packs PNG buffers into a real .ico.
  const ico16 = await svgToPng(svg, 16);
  const ico32 = await svgToPng(svg, 32);
  const ico48 = await svgToPng(svg, 48);
  const icoBuffer = await toIco([ico16, ico32, ico48]);
  await writeFile(path.join(publicDir, 'favicon.ico'), icoBuffer);

  console.log(
    'Favicons generated. Commit public/{favicon.ico,apple-touch-icon.png,icon-192.png,icon-512.png}.',
  );
}

main().catch((err) => {
  console.error('Favicon generation failed:', err);
  process.exit(1);
});
