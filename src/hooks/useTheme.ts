/**
 * useTheme — dark/light theme management with ink-spread View Transitions.
 *
 * Initial state: reads data-theme attribute from <html> (set by blocking script in index.html).
 * NEVER reads from localStorage directly as initial state — this would break SSR
 * (the prerendered HTML has no access to client-side storage).
 *
 * localStorage key: 'pf.theme'
 * DOM attribute: document.documentElement.setAttribute('data-theme', theme)
 *
 * Toggle triggers an ink-spread circular reveal via the View Transitions API.
 * Origin: center of toggle button. Browsers without startViewTransition
 * get an instant swap with no errors thrown.
 */
import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { features } from '@/config/features';

type Theme = 'light' | 'dark';

interface UseThemeResult {
  theme: Theme;
  toggle: (e?: React.MouseEvent) => void;
  isDark: boolean;
}

export function useTheme(): UseThemeResult {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document !== 'undefined') {
      const attr = document.documentElement.getAttribute('data-theme');
      if (attr === 'light' || attr === 'dark') return attr;
    }
    // SSR default matches <html data-theme="dark"> static attribute + blocking-script fallback.
    // Return visitors with localStorage='light' have a one-render mismatch suppressed
    // via suppressHydrationWarning on the theme toggle button.
    return 'dark';
  });

  const reduced = useReducedMotion();
  const transitioning = useRef(false);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  const toggle = (e?: React.MouseEvent): void => {
    const next: Theme = theme === 'light' ? 'dark' : 'light';

    const applyTheme = () => {
      setTheme(next);
      try {
        localStorage.setItem('pf.theme', next);
      } catch {
        // localStorage best-effort — fails in private browsing or when quota exceeded
      }
    };

    // Engines without startViewTransition (Gecko, older WebKit) and the
    // reduced-motion / feature-flag-off paths fall through to an instant swap.
    // No JS clip-path fallback — the API-or-instant binary keeps complexity low.
    if (
      typeof document.startViewTransition !== 'function' ||
      reduced ||
      !features.motion.inkSpreadToggle ||
      transitioning.current
    ) {
      applyTheme();
      return;
    }

    // Guard against rapid toggles
    transitioning.current = true;

    // Origin = center of toggle button
    const rect = e?.currentTarget?.getBoundingClientRect?.();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 40;
    const y = rect ? rect.top + rect.height / 2 : 40;

    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const animId = 'vt-ink-' + Date.now();
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ${animId} {
        from { clip-path: circle(0px at ${x}px ${y}px); }
        to   { clip-path: circle(${radius}px at ${x}px ${y}px); }
      }
      ::view-transition-old(root) { animation: none; }
      ::view-transition-new(root) {
        animation: ${animId} .38s cubic-bezier(.4,0,.2,1);
      }
    `;
    document.head.appendChild(style);

    const tx = document.startViewTransition(applyTheme)!;

    tx.finished.finally(() => {
      style.remove();
      transitioning.current = false;
    });

    // Fallback cleanup in case finished never resolves
    setTimeout(() => {
      style.remove();
      transitioning.current = false;
    }, 1500);
  };

  return { theme, toggle, isDark: theme === 'dark' };
}
