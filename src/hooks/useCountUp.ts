/**
 * useCountUp — animated number counter.
 *
 * Animates from 0 to target when `active` becomes true, using
 * requestAnimationFrame and an ease-out quadratic curve.
 *
 * Disabled (instant target return) when:
 * - features.motion.counterAnimation is false
 * - User has reduced motion preference
 *
 * On active → false → true (e.g. locale switch retrigger), the counter
 * resets to 0 and replays. The parent is expected to hide the element
 * during the false phase (via useScrollReveal's opacity toggle), so the
 * reset isn't visible and the replay reads as a fresh count-up.
 */

import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { features } from '@/config/features';

interface UseCountUpOptions {
  /** Animation duration in ms (default 1200) */
  duration?: number;
}

/**
 * Ease-out quadratic: fast start, moderate deceleration.
 * Shallower tail than cubic — the last digits land quicker.
 * t in [0,1] → output in [0,1].
 */
function easeOutQuad(t: number): number {
  return 1 - (1 - t) * (1 - t);
}

export function useCountUp(target: number, active: boolean, options?: UseCountUpOptions): number {
  const duration = options?.duration ?? 1200;
  const reduced = useReducedMotion();
  const enabled = features.motion.counterAnimation && !reduced;

  const [value, setValue] = useState(() => (enabled ? 0 : target));
  const rafId = useRef(0);

  useEffect(() => {
    if (!enabled) {
      // Sync value when externally disabled — guard on `enabled` prevents cascading.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(target);
      return;
    }

    if (!active) {
      setValue(0);
      return;
    }

    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      setValue(easeOutQuad(t) * target);

      if (t < 1) {
        rafId.current = requestAnimationFrame(tick);
      } else {
        setValue(target); // snap to exact final value
      }
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [target, active, duration, enabled]);

  return value;
}
