/**
 * LocaleContext -- locale state for SSR-safe bilingual rendering.
 *
 * Locale is determined at entry-point level:
 * - Build time: prerender script passes locale explicitly to render(locale).
 * - Runtime: entry-client.tsx reads window.location.pathname.
 *
 * Components use useLocale() to access the current locale. App reads locale
 * from prop/context (NEVER from window.location at render time) so SSR + the
 * client-side hydration use the same source of truth.
 */
import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

export type Locale = 'en' | 'tr';

const LocaleContext = createContext<Locale>('en');

// eslint-disable-next-line react-refresh/only-export-components
export const useLocale = () => useContext(LocaleContext);

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext value={locale}>{children}</LocaleContext>;
}
