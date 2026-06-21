/**
 * Browser entry point -- client-side React hydration.
 *
 * Import order matters:
 * 1. CSS first (tokens -> global -> scrollbar -> animations) so cascade is correct.
 * 2. Fontsource font CSS -- triggers @font-face declarations with unicode-range.
 * 3. React hydration last.
 *
 * Locale detection: reads window.location.pathname.
 * /tr or /tr/ -> 'tr', everything else -> 'en'.
 *
 * Locale is determined here and passed as a prop to App, then propagated via
 * LocaleContext (App never reads window.location at render time). hydrateRoot
 * reuses server-rendered DOM in production; createRoot is used in dev because
 * Vite serves index.html with the ssr-outlet comment unsubstituted.
 */

// Design token CSS -- must load before component CSS Modules
import './styles/tokens.css';
import './styles/global.css';
import './styles/scrollbar.css';
import './styles/animations.css';

// Self-hosted variable fonts -- covers latin + latin-ext (Turkish U+0100-017F) automatically.
// Do NOT import subset-specific paths like '/latin-ext.css' -- those don't exist for variable fonts.
// Import both normal + italic for Fraunces (hero role, education degree, contact heading use italic).
import '@fontsource-variable/fraunces';
import '@fontsource-variable/fraunces/wght-italic.css';
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';

import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import type { Locale } from '@/contexts/LocaleContext';

const locale: Locale = window.location.pathname.startsWith('/tr') ? 'tr' : 'en';
const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('#root element not found');

const tree = (
  <StrictMode>
    <App locale={locale} />
  </StrictMode>
);

// Prod: prerender (scripts/prerender.ts) replaces <!--ssr-outlet--> with rendered
// HTML, so we hydrate. Dev: Vite serves index.html as-is — the <!--ssr-outlet-->
// comment is the only "child", and hydrateRoot would mismatch every element.
// Use createRoot in dev. Detection via Vite's import.meta.env.DEV (build-time const).
if (import.meta.env.DEV) {
  createRoot(rootEl).render(tree);
} else {
  hydrateRoot(rootEl, tree);
}
