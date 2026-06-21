/**
 * useReducedMotion -- detects OS-level prefers-reduced-motion preference.
 *
 * SSR-safe: defaults to false (motion-enabled path) to match the common client
 * render and avoid hydration mismatches across Hero, PortraitImg, and AnimatedText.
 * The useEffect below syncs with the actual OS preference after hydration.
 *
 * When features.flags.reducedMotion is 'off', always returns true regardless of OS setting.
 */
import { useState, useEffect } from 'react';
import { features, type FeatureFlags } from '@/config/features';

const MQ = '(prefers-reduced-motion: reduce)';
const motionPref: FeatureFlags['reducedMotion'] = features.flags.reducedMotion;

export function useReducedMotion(): boolean {
  // SSR-safe: default to false so SSR renders the motion-enabled path (animations,
  // shimmer skeleton, word-fade wrappers). This matches the most common client
  // render (no OS reduced-motion preference) and avoids hydration mismatches.
  //
  // For users who DO have prefers-reduced-motion, the useEffect below corrects
  // the state after hydration.
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (motionPref === 'off') return true;
    return window.matchMedia(MQ).matches;
  });

  useEffect(() => {
    if (motionPref === 'off') return;

    const mql = window.matchMedia(MQ);
    // Sync immediately on mount — catches the case where the SSR default (false)
    // differs from the actual OS preference. This is a mount-once correction, not
    // a derived-state loop, so the effect intentionally excludes `reduced` from
    // its dependency array.
    if (mql.matches !== reduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReduced(mql.matches);
    }
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return reduced;
}
