/**
 * useCursorGlow -- ambient cursor glow effect.
 *
 * Sets --cx and --cy CSS custom properties on document root, which the
 * AmbientGlow overlay div reads via radial-gradient. Disabled on touch
 * devices, when reduced motion is active, or when
 * features.motion.ambientGlow is false.
 *
 * Cleans up CSS properties on mouseleave and unmount.
 */
import { useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { features } from '@/config/features';

export function useCursorGlow(): void {
  const reduced = useReducedMotion();
  const disabled = reduced || !features.motion.ambientGlow;

  useEffect(() => {
    if (disabled) return;
    if (typeof window === 'undefined') return;

    // Skip on coarse-pointer devices (touch) — no cursor to track.
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const root = document.documentElement;

    const onMove = (e: MouseEvent) => {
      root.style.setProperty('--cx', String(e.clientX / window.innerWidth));
      root.style.setProperty('--cy', String(e.clientY / window.innerHeight));
      root.style.setProperty('--glow-opacity', '1');
    };

    // Clear glow visibility (NOT position) when the cursor exits the viewport.
    // Zeroing --glow-opacity drops the alpha on the gradient color stop in
    // global.css and rides the existing `transition: background 0.2s ease-out`
    // for a free fade. We INTENTIONALLY do NOT removeProperty('--cx'/'--cy')
    // here: their CSS fallbacks (0.5 / 0.3) would snap the gradient to
    // top-middle of the viewport, so re-entry from the same edge would visibly
    // jump. Keeping the last-known position means re-entry resumes seamlessly.
    const onLeave = () => {
      root.style.setProperty('--glow-opacity', '0');
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      root.style.removeProperty('--cx');
      root.style.removeProperty('--cy');
      root.style.removeProperty('--glow-opacity');
    };
  }, [disabled]);
}
