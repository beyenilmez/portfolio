/// <reference types="vite/client" />

/**
 * vite-imagetools module declarations.
 *
 * TypeScript module-name patterns support exactly ONE `*` substitution
 * (https://www.typescriptlang.org/docs/handbook/modules/reference.html#wildcards),
 * so the natural-feeling `*.png?*` / `*?*as=picture` shapes (two `*`s) are
 * silently rejected by TS and fall through to the bare-extension declaration
 * from `vite/client.d.ts`, which doesn't include the query suffix and reports
 * TS2307. Use single-wildcard shapes only:
 *   - `*&format=png|jpg|webp` for query-suffixed string URLs (e.g.
 *     `?w=128&format=png` imports).
 *   - `*&as=picture` for the vite-imagetools `Picture` shape.
 */

declare module '*&as=picture' {
  import type { Picture } from 'vite-imagetools';
  const value: Picture;
  export default value;
}

/* Single-wildcard fallback: any module name ending in `&format=png|jpg|webp`
 * resolves to a string URL. Catches `?w=128&format=png` style imports. */
declare module '*&format=png' {
  const src: string;
  export default src;
}
declare module '*&format=jpg' {
  const src: string;
  export default src;
}
declare module '*&format=webp' {
  const src: string;
  export default src;
}
