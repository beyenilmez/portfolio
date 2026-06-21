/**
 * App -- root component.
 *
 * Accepts locale prop from entry points (client hydration or server render).
 * Wraps children in LocaleProvider for downstream useLocale() access.
 * Applies background layer intensity CSS variables to <body> from features.ts.
 * Manages mutable locale state for client-side language switching via pushState.
 *
 * All section components wired: Hero, Projects, Experience, Education, Contact.
 * Footer and BottomTabBar rendered outside <main> (semantic landmarks / fixed overlay).
 */
import { useState, useCallback, useEffect } from 'react';
import { LocaleProvider, type Locale } from '@/contexts/LocaleContext';
import { useTheme } from '@/hooks/useTheme';
import { useCursorGlow } from '@/hooks/useCursorGlow';
import { content } from '@/config/content';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { features } from '@/config/features';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import BottomTabBar from '@/components/BottomTabBar';

export default function App({ locale: initialLocale }: { locale: Locale }) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const { toggle: toggleTheme } = useTheme();
  const reduced = useReducedMotion();
  useCursorGlow();

  // Reflect reduced-motion state on <html> so CSS-only effects (Header/Footer
  // ink-draw underlines) can gate on features.flags.reducedMotion='off' as well
  // as the OS-level @media (prefers-reduced-motion: reduce).
  useEffect(() => {
    const html = document.documentElement;
    if (reduced) html.setAttribute('data-reduced-motion', 'true');
    else html.removeAttribute('data-reduced-motion');
  }, [reduced]);

  const switchLocale = useCallback(
    (target: Locale) => {
      if (target === locale) return;
      setLocale(target);
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', target === 'tr' ? '/tr' : '/');
      }
    },
    [locale],
  );

  // Update document metadata on locale change — SPA pushState navigation
  // doesn't reload the page, so <head> stays frozen from initial load.
  useEffect(() => {
    const role = content.i18n.hero.roleMobile[locale];
    document.title = `${content.i18n.hero.name} - ${role}`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', content.i18n.hero.heroDesc[locale]);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', document.title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', content.i18n.hero.heroDesc[locale]);
  }, [locale]);

  // Apply background layer intensity CSS variables to <body> on mount.
  // These values come from features.ts -- config changes take effect automatically.
  // Run once: these are compile-time constants, not reactive values.
  useEffect(() => {
    const b = document.body.style;
    b.setProperty('--bg-grain', String(features.backgrounds.grainOpacity));
    b.setProperty('--bg-grain-sz', features.backgrounds.grainSize + 'px');
    b.setProperty('--bg-warm', String(features.backgrounds.warmOpacity));
    b.setProperty('--bg-press', String(features.backgrounds.pressOpacity));
  }, []);

  return (
    <LocaleProvider locale={locale}>
      <div className="ambientGlow" aria-hidden="true" />
      <a href="#main-content" className="skip-link">
        {content.i18n.labels.skipToContent[locale]}
      </a>
      <Header onSwitchLocale={switchLocale} onToggleTheme={toggleTheme} />
      <main id="main-content">
        <Hero />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BottomTabBar />
    </LocaleProvider>
  );
}
