/**
 * Lightbox -- editorial-styled image viewer wrapper around yet-another-react-lightbox.
 *
 * Features: carousel, thumbnail strip, counter, zoom, keyboard nav, focus trap.
 * Dark backdrop with blur, JetBrains Mono counter,
 * Fraunces serif title, brass accent on active thumbnail.
 *
 * Receives open state and slide data from parent (Projects.tsx).
 * Does not manage its own open/close state.
 */
import YarlLightbox, { useLightboxState } from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import styles from './Lightbox.module.css';

export interface LightboxData {
  slides: { src: string }[];
  index: number;
  title: string;
  /** Locale-aware eyebrow label (e.g. "PROJECT" / "PROJE"). */
  eyebrow?: string;
}

interface LightboxProps {
  data: LightboxData | null;
  onClose: () => void;
}

/**
 * TitleBar -- container-anchored top bar (rendered via render.controls slot).
 *
 * The per-slide render slot is invoked inside each .yarl__slide which
 * translates with the .yarl__carousel during navigation. render.controls
 * runs ONCE inside .yarl__container (sibling of .yarl__carousel) and does
 * NOT translate -- so the title bar stays anchored to the viewport.
 *
 * Counter is bespoke JSX (two <span>s) rather than the yarl Counter
 * plugin: the plugin's CounterComponent renders only text nodes, so a
 * `:first-child` accent selector matches nothing. With explicit element
 * children the brass-on-current / dim-on-total split paints correctly.
 */
function TitleBar({ title, eyebrow = 'PROJECT' }: { title: string; eyebrow?: string }) {
  const { currentIndex, slides } = useLightboxState();
  const current = String(currentIndex + 1).padStart(2, '0');
  const total = String(slides.length).padStart(2, '0');

  return (
    <div className={styles.titleBar}>
      <div className={styles.titleBarLeft}>
        <div className={styles.eyebrow}>{eyebrow}</div>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.titleBarRight}>
        <div className={styles.counter} aria-hidden="true">
          <span className={styles.counterCurrent}>{current}</span>
          <span className={styles.counterTotal}> / {total}</span>
        </div>
      </div>
    </div>
  );
}

export default function Lightbox({ data, onClose }: LightboxProps) {
  if (!data) return null;

  return (
    <YarlLightbox
      open={!!data}
      close={onClose}
      index={data.index}
      slides={data.slides}
      plugins={[Thumbnails, Zoom]}
      thumbnails={{
        position: 'bottom',
        width: 84,
        height: 54,
        borderRadius: 3,
        gap: 10,
        imageFit: 'cover',
      }}
      zoom={{
        maxZoomPixelRatio: 1.8,
        scrollToZoom: true,
        wheelZoomDistanceFactor: 100,
        pinchZoomDistanceFactor: 100,
        doubleTapDelay: 300,
        doubleClickDelay: 300,
        doubleClickMaxStops: 2,
        keyboardMoveDistance: 50,
      }}
      carousel={{
        finite: false,
        preload: 1,
      }}
      animation={{
        swipe: 500,
      }}
      styles={{
        container: {
          backdropFilter: 'blur(14px)',
        },
      }}
      className={styles.lightbox}
      render={{
        controls: () => <TitleBar title={data.title} eyebrow={data.eyebrow} />,
      }}
    />
  );
}
