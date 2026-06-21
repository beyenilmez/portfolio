/**
 * Section — shared scaffolding wrapper for content sections.
 *
 * Absorbs: useScrollReveal hook, opacity/transform reveal style, kicker rendering,
 * and the inner container wrapper that consumers all share.
 *
 * Renders: <section ref reveal style>{<div container>{kicker}{children}</div>}{afterContainer}</section>
 *
 * The kicker is rendered inside the consumer's container so it inherits the
 * container's max-width / centering.
 *
 * Kicker shape:
 * - When kickerExtra is provided (Projects has a count display next to the
 *   kicker), Section renders <div kickerRow><span kicker/>{kickerExtra}</div>
 *   to preserve Projects' flex row.
 * - Otherwise (Education, Contact, Experience) Section renders the kicker
 *   as a bare <span kicker/> with no wrapper.
 *
 * Reveal motion is driven by tokens.css custom properties:
 * --reveal-distance, --reveal-duration, --reveal-easing, --reveal-transition.
 *
 * Hero is intentionally not wrapped in Section — its kicker sits inside
 * .outerWrap (not as a direct child of <section>) and its <section> needs
 * a `position: relative` inline style for parallax. The abstraction doesn't
 * earn its keep for that single, structurally-different consumer.
 */
import { type ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Section.module.css';

interface SectionProps {
  /** DOM id for nav anchor stability — matches Header.tsx NAV_ITEMS[].id. */
  id: 'profile' | 'projects' | 'experience' | 'education' | 'contact';
  /** Two-digit kicker prefix, e.g. '02'. */
  index: string;
  /** UPPERCASE label, e.g. 'PROJECTS'. */
  label: string;
  /** retriggerKey for useScrollReveal (typically locale). */
  revealKey?: string | number;
  /** Override class on outer <section> — consumer-specific layout. */
  className?: string;
  /** Override class on inner <div> container — consumer's own styles.container preserves max-width / centering. */
  containerClassName?: string;
  /** Override class on inner kicker <span> — consumer's own styles.kicker preserves visual fidelity. */
  kickerClassName?: string;
  /** Override class on the kicker row <div> wrapper — only applied when kickerExtra is non-empty. */
  kickerRowClassName?: string;
  /** Optional extra slot in the kicker row. When provided, Section wraps kicker+extra in a <div> row. */
  kickerExtra?: ReactNode;
  /** Section body — rendered inside the inner container, after the kicker. */
  children: ReactNode;
  /** Optional extra content rendered AFTER the inner container, as a sibling inside <section>. Projects uses this for the lazy <Suspense><Lightbox/></Suspense> mount. */
  afterContainer?: ReactNode;
}

export default function Section({
  id,
  index,
  label,
  revealKey,
  className,
  containerClassName,
  kickerClassName,
  kickerRowClassName,
  kickerExtra,
  children,
  afterContainer,
}: SectionProps) {
  const { ref: revealRef, shown } = useScrollReveal(revealKey);
  const kicker = (
    <span className={kickerClassName ?? styles.kicker}>
      {index} · {label}
    </span>
  );
  return (
    <section
      id={id}
      className={className ?? styles.section}
      ref={revealRef}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(var(--reveal-distance))',
        transition: 'var(--reveal-transition)',
      }}
    >
      <div className={containerClassName}>
        {kickerExtra ? (
          <div className={kickerRowClassName ?? styles.kickerRow}>
            {kicker}
            {kickerExtra}
          </div>
        ) : (
          kicker
        )}
        {children}
      </div>
      {afterContainer}
    </section>
  );
}
