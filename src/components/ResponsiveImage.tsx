/**
 * ResponsiveImage — shared <picture>+<source>+<img> wrapper for a vite-imagetools Picture.
 *
 * Used by PortraitImg (LCP, shimmer onLoad) and Projects (lazy card thumb, lightbox onClick).
 *
 * Default loading='lazy' is the safe choice — non-'lazy' triggers React 19's
 * SSR auto-preload behavior (an unmasked `<link rel=preload as=image>` for the
 * first declared srcset variant). Consumers explicitly opt into 'eager' if
 * needed; currently no consumer does.
 */
import { useRef, useEffect } from 'react';
import type { Picture } from 'vite-imagetools';

interface ResponsiveImageProps {
  /** Picture object from vite-imagetools `?as=picture` query. */
  src: Picture;
  alt: string;
  /** Per call-site sizes attribute. */
  sizes: string;
  /** Default 'lazy'. Avoids React 19 SSR auto-preload. */
  loading?: 'lazy' | 'eager';
  /** Default 'async'. */
  decoding?: 'async' | 'sync' | 'auto';
  className?: string;
  style?: React.CSSProperties;
  /** Optional: PortraitImg uses this for shimmer state. */
  onLoad?: () => void;
  /** Optional: Projects card uses this for lightbox open. */
  onClick?: () => void;
}

export default function ResponsiveImage({
  src,
  alt,
  sizes,
  loading = 'lazy',
  decoding = 'async',
  className,
  style,
  onLoad,
  onClick,
}: ResponsiveImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  // Guard against the hydration race: a cached image fires onLoad before
  // React attaches the handler. If the image is already complete on mount
  // (or becomes complete before onLoad fires), notify the consumer.
  useEffect(() => {
    const el = imgRef.current;
    if (!el || !onLoad) return;
    if (el.complete) {
      onLoad();
      return;
    }
    const check = () => {
      if (el.complete) onLoad();
    };
    el.addEventListener('load', check);
    return () => el.removeEventListener('load', check);
  }, [onLoad]);

  return (
    <picture>
      {Object.entries(src.sources).map(([format, srcset]) => (
        <source key={format} type={`image/${format}`} srcSet={srcset} sizes={sizes} />
      ))}
      <img
        ref={imgRef}
        src={src.img.src}
        alt={alt}
        onClick={onClick}
        className={className}
        loading={loading}
        decoding={decoding}
        style={{
          aspectRatio: `${src.img.w} / ${src.img.h}`,
          ...style,
        }}
      />
    </picture>
  );
}
