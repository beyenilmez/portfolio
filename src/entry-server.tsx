/**
 * Server entry point -- build-time HTML generation.
 *
 * Called by scripts/prerender.ts via `vite build --ssr`.
 * Exports render(locale) that returns an HTML string of the React app.
 *
 * IMPORTANT: Do NOT import CSS files or Fontsource here.
 * CSS is irrelevant in Node. Font @font-face declarations are meaningless in Node.
 * Only entry-client.tsx imports those.
 */
import { renderToString } from 'react-dom/server';
import App from './App';
import type { Locale } from '@/contexts/LocaleContext';

export function render(locale: Locale): string {
  return renderToString(<App locale={locale} />);
}

export { content } from '@/config/content';
