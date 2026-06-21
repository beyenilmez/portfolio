/**
 * useScrollReveal -- scroll-triggered reveal animation hook.
 *
 * IntersectionObserver fires once when element enters viewport.
 * Pass retriggerKey (e.g. locale) to replay the animation.
 * Uses callback ref to guarantee observer setup after DOM attachment.
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { features } from '@/config/features';

export function useScrollReveal(retriggerKey?: string | number): {
  ref: (node: HTMLElement | null) => void;
  shown: boolean;
} {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  const reduced = useReducedMotion();
  const first = useRef(true);

  const ref = useCallback((el: HTMLElement | null) => {
    setNode(el);
  }, []);

  useEffect(() => {
    if (reduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- immediate show when motion disabled
      setShown(true);
      return;
    }
    if (!node) return;

    // On retriggerKey change (not first mount), briefly un-show so the
    // transition replays, then observe again.
    if (!first.current) {
      setShown(false);
      const t = setTimeout(() => setShown(true), 40);
      return () => clearTimeout(t);
    }
    first.current = false;

    // On mobile, tall sections need earlier trigger — use 0 threshold and
    // positive bottom margin so they animate in before scrolling past.
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      {
        threshold: isMobile ? 0 : features.motion.revealThreshold,
        rootMargin: isMobile ? '0px 0px 120px 0px' : features.motion.revealRootMargin,
      },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [node, retriggerKey, reduced]);

  return { ref, shown };
}
