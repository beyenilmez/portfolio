/**
 * Feature configuration — animation toggles and motion thresholds.
 *
 * How it's used:
 * - motion.* flags gate each animation effect in its respective hook/component.
 * - backgrounds.* values set opacity/threshold for warm glow, grain, and press layers
 *   applied by App.tsx via CSS setProperty().
 * - flags.reducedMotion: 'auto' = respect prefers-reduced-motion; 'off' = disable all motion.
 *
 * Valid values for flags.reducedMotion: 'auto' | 'off'
 */

interface MotionConfig {
  /** Enable ambient cursor glow */
  ambientGlow: boolean;
  /** Parallax scroll strength in px */
  parallaxStrength: number;
  /** IntersectionObserver threshold for scroll reveal */
  revealThreshold: number;
  /** IntersectionObserver rootMargin for scroll reveal */
  revealRootMargin: string;
  /** Enable ink-spread circular reveal on theme toggle */
  inkSpreadToggle: boolean;
  /** Enable word-fade animation on language switch */
  wordFadeLang: boolean;
  /** Enable letter-stagger on language switch */
  letterStagger: boolean;
  /** Enable 3D tilt + glare on project cards */
  cardTilt: boolean;
  /** Animate GPA counter on scroll reveal */
  counterAnimation: boolean;
}

export interface FeatureFlags {
  /**
   * Motion reduction strategy.
   * 'auto' = respect OS prefers-reduced-motion setting (WCAG 2.3.3 compliant).
   * 'off'  = disable all animations globally (for testing/accessibility).
   */
  reducedMotion: 'auto' | 'off';
}

interface BackgroundThresholds {
  /** Warm radial wash opacity (0-1) */
  warmOpacity: number;
  /** Paper grain opacity (0-1) */
  grainOpacity: number;
  /** Paper grain tile size in px */
  grainSize: number;
  /** Letterpress groove opacity (0-1) */
  pressOpacity: number;
}

interface FeatureConfig {
  motion: MotionConfig;
  flags: FeatureFlags;
  backgrounds: BackgroundThresholds;
}

export const features = {
  motion: {
    ambientGlow: true,
    parallaxStrength: 16,
    revealThreshold: 0.12,
    revealRootMargin: '0px 0px -40px 0px',
    inkSpreadToggle: true,
    wordFadeLang: true,
    letterStagger: true,
    cardTilt: true,
    counterAnimation: true,
  },
  flags: {
    reducedMotion: 'auto' as const,
  },
  backgrounds: {
    warmOpacity: 0.35,
    grainOpacity: 0.12,
    grainSize: 60,
    pressOpacity: 0.07,
  },
} satisfies FeatureConfig;
