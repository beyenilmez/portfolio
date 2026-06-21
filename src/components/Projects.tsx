/**
 * Projects -- filterable card grid showcasing portfolio work.
 *
 * Layout:
 * - Section kicker + heading
 * - Count display + chip filter bar (All + unique tags)
 * - 2-column card grid (1-column on mobile)
 * - Empty state with clear filter button
 *
 * Each card shows: thumbnail with lazy loading, index badge,
 * image count badge, title, year, tags, blurb, and links.
 */
import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useLocale, type Locale } from '@/contexts/LocaleContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTilt } from '@/hooks/useTilt';
import { content } from '@/config/content';
import ResponsiveImage from '@/components/ResponsiveImage';
import Section from '@/components/Section';
import type { LightboxData } from '@/components/Lightbox';
import styles from './Projects.module.css';

// Lazy-load Lightbox + its yarl plugins. Vite/Rollup auto-chunks the dynamic
// import — DO NOT add manualChunks (would defeat the lazy split and pull yarl
// into the initial bundle).
const Lightbox = lazy(() => import('@/components/Lightbox'));

function ProjectCard({
  project,
  locale,
  onImageClick,
  staggerIndex,
}: {
  project: (typeof content.projects)[0];
  locale: Locale;
  onImageClick: (project: (typeof content.projects)[0], index: number) => void;
  staggerIndex: number;
}) {
  const { ref, wrapStyle, cardStyle, glareStyle, handlers } = useTilt();

  // noUncheckedIndexedAccess makes project.images[0] Picture | undefined. Bind once,
  // narrow once, render nothing if somehow empty (defensive — content.ts guarantees ≥1).
  const firstImg = project.images[0];
  if (!firstImg) return null;

  return (
    <div style={{ ...wrapStyle, '--i': staggerIndex } as React.CSSProperties}>
      <article
        className={styles.card}
        ref={ref as React.RefObject<HTMLElement>}
        style={cardStyle}
        onMouseEnter={handlers.onMouseEnter}
        onMouseLeave={handlers.onMouseLeave}
        onMouseMove={handlers.onMouseMove}
      >
        <div className={styles.glare} style={glareStyle} aria-hidden="true" />

        <div className={styles.imageWrap}>
          <ResponsiveImage
            src={firstImg}
            alt={project.title[locale]}
            sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 600px"
            loading="eager"
            decoding="async"
            className={styles.cardImage}
            style={{ cursor: 'zoom-in' }}
            onClick={() => onImageClick(project, 0)}
          />
          <span className={styles.indexBadge}>{project.year}</span>
          {project.images.length > 1 && (
            <span className={styles.countBadge}>&#x229E; {project.images.length}</span>
          )}
          {project.showcased && <span className={styles.showcasedBadge}>&#x2605;</span>}
        </div>

        <div className={styles.cardContent}>
          <span className={styles.cardTitle}>{project.title[locale]}</span>
          <div className={styles.cardTags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
          <p className={styles.cardBlurb}>{project.blurb[locale]}</p>
          <div className={styles.cardLinks}>
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkPill}
              >
                &#x2197; {content.i18n.labels.website[locale]}
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkPill}
              >
                &#x2325; {content.i18n.labels.sourceCode[locale]}
              </a>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}

export default function Projects() {
  const locale = useLocale();
  const reduced = useReducedMotion();
  const [activeTag, setActiveTag] = useState<string>('All');
  const [lightboxData, setLightboxData] = useState<LightboxData | null>(null);

  // Idle preload of the lightbox chunk after first paint so the click-to-open
  // path stays snappy without bloating LCP. requestIdleCallback (with a
  // setTimeout(0) Safari fallback) is soft scheduling — chunk-on-click still
  // works if the idle preload is skipped.
  useEffect(() => {
    const preload = () => {
      void import('@/components/Lightbox');
    };
    // typeof check (not `in`) avoids TS narrowing the else-branch window type to never.
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(preload, { timeout: 2000 });
      return () => window.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(preload, 0);
    return () => window.clearTimeout(id);
  }, []);

  // Locale-switch stagger: bump staggerKey on locale change to force a remount
  // of filter chips + grid so the per-item CSS animation (--i / animation-delay)
  // replays. Skip on reduced-motion and on the very first render.
  const firstLocaleRender = useRef(true);
  const [staggerKey, setStaggerKey] = useState(0);

  useEffect(() => {
    if (reduced) return;
    if (firstLocaleRender.current) {
      firstLocaleRender.current = false;
      return;
    }
    setStaggerKey((k) => k + 1);
  }, [locale, reduced]);

  const openLightbox = (project: (typeof content.projects)[0], imageIndex: number) => {
    // yarl slides[].src is a string, not a srcset. Use picture.img.src (the
    // JPEG fallback URL — vite-imagetools picks the largest declared width,
    // 1200w in this case). Lightbox loads on-click, doesn't affect LCP.
    setLightboxData({
      slides: project.images.map((p) => ({ src: p.img.src })),
      index: imageIndex,
      title: project.title[locale],
      eyebrow: content.i18n.labels.lightboxEyebrow[locale],
    });
  };

  // Tags in order of appearance when projects are sorted by weight desc
  const allTags = (() => {
    const sorted = [...content.projects].sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0));
    const seen = new Set<string>();
    const tags: string[] = [];
    for (const p of sorted) {
      for (const tag of p.tags) {
        if (!seen.has(tag)) {
          seen.add(tag);
          tags.push(tag);
        }
      }
    }
    return tags;
  })();

  // Filter: tag filter + showcased filter → sort by weight desc
  const filtered = (() => {
    let list = content.projects;

    if (activeTag === 'Showcased') {
      list = list.filter((p) => p.showcased);
    } else if (activeTag !== 'All') {
      list = list.filter((p) => p.tags.includes(activeTag));
    }

    return [...list].sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0));
  })();

  // Empty state heading per reference: "Nothing here <em>yet</em>." / "Burada bir sey <em>yok</em>."
  const emptyRest = content.i18n.labels.emptyRest[locale];
  const emptyAccent = content.i18n.labels.emptyAccent[locale];

  return (
    <Section
      id="projects"
      index="02"
      label={content.i18n.labels.projects[locale].toLocaleUpperCase(
        locale === 'tr' ? 'tr-TR' : 'en-US',
      )}
      revealKey={locale}
      className={styles.section}
      containerClassName={styles.container}
      kickerClassName={styles.kicker}
      kickerRowClassName={styles.kickerRow}
      kickerExtra={
        <span className={styles.count}>
          {filtered.length} / {content.projects.length} {content.i18n.labels.selectedLower[locale]}
        </span>
      }
      afterContainer={
        lightboxData ? (
          <Suspense fallback={null}>
            <Lightbox data={lightboxData} onClose={() => setLightboxData(null)} />
          </Suspense>
        ) : undefined
      }
    >
      <div
        className={styles.filterRow}
        key={`filter-${staggerKey}`}
        role="group"
        aria-label={content.i18n.labels.filter[locale]}
      >
        <button
          className={activeTag === 'All' ? styles.chipActive : styles.chip}
          onClick={() => setActiveTag('All')}
          style={{ '--i': 0 } as React.CSSProperties}
        >
          {content.i18n.labels.all[locale]}
        </button>

        <button
          className={activeTag === 'Showcased' ? styles.chipShowcasedActive : styles.chipShowcased}
          onClick={() => setActiveTag('Showcased')}
          style={{ '--i': 1 } as React.CSSProperties}
        >
          ★ {content.i18n.labels.showcased[locale]}
        </button>

        <span className={styles.separator} aria-hidden="true" />

        {allTags.map((tag, i) => (
          <button
            key={tag}
            className={activeTag === tag ? styles.chipActive : styles.chip}
            onClick={() => setActiveTag(tag)}
            style={{ '--i': i + 2 } as React.CSSProperties}
          >
            {tag}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className={styles.grid} key={`grid-${staggerKey}`}>
          {filtered.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              locale={locale}
              onImageClick={openLightbox}
              staggerIndex={idx}
            />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <h2>
            {emptyRest}
            <em className={styles.emptyAccent}>{emptyAccent}</em>.
          </h2>
          <p>{content.i18n.labels.emptyBody[locale]}</p>
          <button className={styles.clearBtn} onClick={() => setActiveTag('All')}>
            {content.i18n.labels.clearFilter[locale]}
          </button>
        </div>
      )}
    </Section>
  );
}
