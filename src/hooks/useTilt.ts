/**
 * useTilt -- 3D tilt effect for project cards.
 *
 * Perspective goes on PARENT wrapper (not in transform string).
 * Card uses transformStyle: 'preserve-3d'.
 * During active tilt: NO transform transition (instant tracking).
 * On mouse leave: .45s cubic-bezier reset.
 */
import { useState, useRef, useCallback, useSyncExternalStore } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { features } from '@/config/features';

// Tilt enabled on non-mobile viewports only
function useIsMobile(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia('(max-width: 640px)');
      mql.addEventListener('change', cb);
      return () => mql.removeEventListener('change', cb);
    },
    () => window.matchMedia('(max-width: 640px)').matches,
    () => true, // SSR: assume mobile (no tilt)
  );
}

interface TiltResult {
  ref: React.RefObject<HTMLElement | null>;
  /** Style for the PARENT perspective wrapper */
  wrapStyle: React.CSSProperties;
  /** Style for the card article itself */
  cardStyle: React.CSSProperties;
  glareStyle: React.CSSProperties;
  hover: boolean;
  handlers: {
    onMouseMove: (e: React.MouseEvent) => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
}

export function useTilt(): TiltResult {
  const ref = useRef<HTMLElement | null>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, px: 50, py: 50, lift: false });
  const [hover, setHover] = useState(false);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const tiltOn = !reduced && features.motion.cardTilt && !isMobile;

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!tiltOn || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width;
      const ny = (e.clientY - r.top) / r.height;
      setTilt({
        rx: (0.5 - ny) * 4.5,
        ry: (nx - 0.5) * 6,
        px: nx * 100,
        py: ny * 100,
        lift: true,
      });
    },
    [tiltOn],
  );

  const onMouseEnter = useCallback(() => setHover(true), []);
  const onMouseLeave = useCallback(() => {
    setHover(false);
    setTilt({ rx: 0, ry: 0, px: 50, py: 50, lift: false });
  }, []);

  // Perspective on PARENT wrapper (not in card transform)
  const wrapStyle: React.CSSProperties = {
    perspective: tiltOn ? 1000 : undefined,
    height: '100%',
  };

  // Card transform + transition
  const cardStyle: React.CSSProperties = {
    // During active tilt: only border-color/box-shadow transition (no transform transition = instant tracking)
    // On release: transform .45s + border/shadow transitions
    transition: tilt.lift
      ? 'border-color .2s, box-shadow .2s'
      : 'transform .45s cubic-bezier(.2,.7,.3,1), border-color .2s, box-shadow .3s',
    transform: tiltOn
      ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(${hover ? -3 : 0}px) translateZ(${tilt.lift ? 4 : 0}px)`
      : hover
        ? 'translateY(-3px)'
        : 'translateY(0)',
    transformStyle: 'preserve-3d',
  };

  const glareStyle: React.CSSProperties =
    !tiltOn || !tilt.lift
      ? { display: 'none' }
      : {
          background: `radial-gradient(340px circle at ${tilt.px}% ${tilt.py}%, var(--color-accent-22, rgba(138,90,43,0.22)), transparent 55%)`,
          mixBlendMode: 'overlay',
        };

  return {
    ref,
    wrapStyle,
    cardStyle,
    glareStyle,
    hover,
    handlers: { onMouseMove, onMouseEnter, onMouseLeave },
  };
}
