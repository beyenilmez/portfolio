/**
 * Experience section -- spine timeline with company logos and exclusive accordion.
 *
 * Each entry shows company logo, role, dates, location and expands to reveal
 * bullet points and technology tags. Only one entry can be
 * expanded at a time (exclusive accordion pattern).
 */

import { useState, type ReactNode } from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import { content } from '@/config/content';
import Section from '@/components/Section';
import semaforLogo from '@/assets/companies/semafor.webp?w=72&format=webp';
import havelsanLogo from '@/assets/companies/havelsan.webp?w=72&format=webp';
import aselsanLogo from '@/assets/companies/aselsan.webp?w=72&format=webp';
import styles from './Experience.module.css';

const LOGOS: Record<string, string> = {
  semafor: semaforLogo,
  aselsan: aselsanLogo,
  havelsan: havelsanLogo,
};

/* ------------------------------------------------------------------ */
/*  Date helpers                                                       */
/* ------------------------------------------------------------------ */
/** Parse **bold** markup into <strong> elements, returning mixed text + strong nodes. */
function renderBold(text: string): ReactNode {
  return text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function formatDateRange(start: string, end: string, locale: 'en' | 'tr', present: string): string {
  const fmt = (iso: string) => {
    const [y, m] = iso.split('-');
    const date = new Date(Number(y), Number(m) - 1);
    return date.toLocaleDateString(locale === 'en' ? 'en-US' : 'tr-TR', {
      month: 'short',
      year: 'numeric',
    });
  };
  const now = new Date();
  const endParts = end.split('-').map(Number);
  const ey = endParts[0] ?? 0;
  const em = endParts[1] ?? 1;
  const endDate = new Date(ey, em - 1);
  const isPresent = endDate > now;
  return `${fmt(start)} \u2014 ${isPresent ? present : fmt(end)}`;
}

function calcDuration(start: string, end: string): number {
  const sp = start.split('-').map(Number);
  const ep = end.split('-').map(Number);
  const sy = sp[0] ?? 0;
  const sm = sp[1] ?? 0;
  const ey = ep[0] ?? 0;
  const em = ep[1] ?? 0;
  return (ey - sy) * 12 + (em - sm);
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function Experience() {
  const locale = useLocale();
  const [openId, setOpenId] = useState<string | null>(content.experience[0]?.id ?? null);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <Section
      id="experience"
      index="03"
      label={content.i18n.labels.experience[locale].toLocaleUpperCase(
        locale === 'tr' ? 'tr-TR' : 'en-US',
      )}
      revealKey={locale}
      className={styles.section}
      containerClassName={styles.container}
      kickerClassName={styles.kicker}
    >
      <div className={styles.timeline}>
        {content.experience.map((entry) => {
          const isOpen = openId === entry.id;
          const months = calcDuration(entry.start, entry.end);

          return (
            <div className={styles.entry} key={entry.id}>
              <span className={`${styles.dot} ${isOpen ? styles.dotActive : ''}`} />

              <button
                className={`${styles.accordionBtn} ${isOpen ? styles.accordionBtnOpen : ''}`}
                onClick={() => toggle(entry.id)}
                aria-expanded={isOpen}
                aria-controls={`exp-panel-${entry.id}`}
                type="button"
              >
                <img className={styles.logo} src={LOGOS[entry.id]} alt="" aria-hidden="true" />

                <span className={styles.meta}>
                  <span className={styles.company}>{entry.company}</span>
                  <span
                    className={styles.role}
                    key={'erole-' + entry.id + '-' + locale}
                    style={{ animation: 'wordFade .5s both' }}
                  >
                    {entry.role[locale]} &middot; {entry.location[locale]}
                  </span>
                </span>

                <span className={styles.dateCol}>
                  <span>
                    {formatDateRange(
                      entry.start,
                      entry.end,
                      locale,
                      content.i18n.labels.present[locale],
                    ).toLocaleUpperCase(locale === 'tr' ? 'tr-TR' : 'en-US')}
                  </span>
                  <span className={styles.duration}>{months}mo</span>
                </span>
              </button>

              <div
                id={`exp-panel-${entry.id}`}
                role="region"
                className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}
              >
                <div className={styles.panelInner}>
                  <ul className={styles.bullets} key={'ebul-' + entry.id + '-' + locale}>
                    {entry.bullets.map((bullet, i) => (
                      <li key={i} style={{ animation: `wordFade .45s ${i * 0.05}s both` }}>
                        {renderBold(bullet[locale])}
                      </li>
                    ))}
                  </ul>

                  <div className={styles.tags}>
                    {entry.tags.map((tag) => (
                      <span className={styles.tag} key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
