/**
 * PortraitImg -- portrait image with shimmer skeleton loading state.
 *
 * Two layers:
 * 1. Skeleton base with gradient shimmer sweep (visible while loading)
 * 2. Actual image that crossfades in on load (opacity 0->1, blur 12px->0)
 *
 * When reduced motion is active, image appears instantly without shimmer.
 */
import { useState } from 'react';
import { preload } from 'react-dom';
import type { Picture } from 'vite-imagetools';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import ResponsiveImage from '@/components/ResponsiveImage';
import styles from './PortraitImg.module.css';

interface PortraitImgProps {
  /** Picture object from vite-imagetools `?as=picture` query. */
  src: Picture;
  alt: string;
  className?: string;
  imgStyle?: React.CSSProperties;
}

/**
 * Responsive sizes string -- shared between the rendered `<source>` element and
 * the `ReactDOM.preload()` call below. Both must use the *same* string for the
 * browser to dedupe the preload against the picked `<picture>` variant.
 *
 * Mobile (≤640px): 68px circular avatar -- picks the 480w WebP (~26 KB).
 * Tablet (≤1023px): 240px portrait -- picks the 720w WebP.
 * Desktop (>1023px): 340px portrait -- picks the 1440w WebP (~60 KB).
 */
const PORTRAIT_SIZES = '(max-width: 640px) 68px, (max-width: 1023px) 240px, 340px';

export default function PortraitImg({ src, alt, className, imgStyle }: PortraitImgProps) {
  const [loaded, setLoaded] = useState(false);
  const reduced = useReducedMotion();

  // Emit a responsive image preload to <head> so the browser fetches the right
  // WebP variant before parsing <picture>. Pairs with loading="lazy" below to
  // suppress React 19's SSR auto-preload of the desktop JPEG (which would otherwise
  // waste ~140 KB on mobile).
  //
  // Called inline during render -- per react.dev/reference/react-dom/preload,
  // server-side rendering only honors preload() calls made during rendering;
  // useEffect would be too late.
  //
  // Dedup: imageSrcSet + imageSizes match the rendered <source> attributes,
  // so the browser merges this preload with the <picture> selection.
  preload(src.img.src, {
    as: 'image',
    imageSrcSet: src.sources.webp,
    imageSizes: PORTRAIT_SIZES,
    fetchPriority: 'high',
  });

  const showShimmer = !reduced && !loaded;

  return (
    <div className={`${styles.container} ${className ?? ''}`}>
      {/* Skeleton base — hidden when reduced motion or image loaded */}
      {!reduced && (
        <div className={styles.skeleton} style={{ opacity: loaded ? 0 : 1 }} aria-hidden="true" />
      )}

      {/* Shimmer sweep */}
      {showShimmer && (
        <div className={styles.shimmerWrap} aria-hidden="true">
          <div className={styles.shimmer} />
        </div>
      )}

      <ResponsiveImage
        src={src}
        alt={alt}
        sizes={PORTRAIT_SIZES}
        loading="lazy"
        decoding="async"
        className={styles.image}
        onLoad={() => setLoaded(true)}
        style={
          reduced
            ? {}
            : {
                opacity: loaded ? 1 : 0,
                filter: loaded ? 'blur(0px)' : 'blur(12px)',
                ...imgStyle,
              }
        }
      />
    </div>
  );
}
