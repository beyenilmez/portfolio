/**
 * useParallax -- hero parallax scroll effect.
 *
 * Returns raw offset values so consumer can apply both container transform
 * and counter-parallax image transform. Direction: NEGATIVE (moves opposite
 * to cursor for depth illusion). Y damped to 0.6x.
 *
 * Desktop only — disabled on tablet/mobile.
 */
import { useState, useEffect, useSyncExternalStore } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { features } from '@/config/features';

// Strength = 0 on non-desktop viewports
function useIsDesktop(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia('(min-width: 1024px)');
      mql.addEventListener('change', cb);
      return () => mql.removeEventListener('change', cb);
    },
    () => window.matchMedia('(min-width: 1024px)').matches,
    () => false,
  );
}

export function useParallax(): {
  offsetX: number;
  offsetY: number;
  disabled: boolean;
} {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();
  const isDesktop = useIsDesktop();
  const strength = isDesktop ? features.motion.parallaxStrength : 0;
  const disabled = reduced || !strength;

  useEffect(() => {
    if (disabled) return;
    if (typeof window === 'undefined') return;

    const handler = (e: MouseEvent) => {
      const cx = e.clientX / window.innerWidth;
      const cy = e.clientY / window.innerHeight;
      // NEGATIVE direction (opposite to cursor) for depth illusion
      setOffset({
        x: (cx - 0.5) * -strength,
        y: (cy - 0.5) * -strength * 0.6,
      });
    };

    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, [disabled, strength]);

  return { offsetX: offset.x, offsetY: offset.y, disabled };
}
