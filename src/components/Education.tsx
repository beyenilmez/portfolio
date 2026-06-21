/**
 * Education section — university logo, degree, GPA, year.
 */
import { useLocale } from '@/contexts/LocaleContext';
import { content } from '@/config/content';
import Section from '@/components/Section';
import deuLogo from '@/assets/deu.webp?w=88&format=webp';
import styles from './Education.module.css';

export default function Education() {
  const locale = useLocale();

  return (
    <Section
      id="education"
      index="04"
      label={content.i18n.labels.education[locale].toLocaleUpperCase(
        locale === 'tr' ? 'tr-TR' : 'en-US',
      )}
      revealKey={locale}
      className={styles.section}
      containerClassName={styles.container}
      kickerClassName={styles.kicker}
    >
      {content.education.map((entry) => (
        <div key={entry.id} className={styles.entry}>
          {/* Main content */}
          <div className={styles.mainCol}>
            <div
              className={styles.schoolRow}
              key={'edusch-' + locale}
              style={{ animation: 'wordFade .5s both' }}
            >
              <img
                src={deuLogo}
                alt="Dokuz Eylul University"
                className={styles.logo}
                loading="lazy"
              />
              <span className={styles.school}>{entry.school[locale]}</span>
            </div>
            <span
              className={styles.degree}
              key={'edudeg-' + locale}
              style={{ animation: 'wordFade .55s .08s both' }}
            >
              {entry.degree[locale]}
            </span>
            <span
              className={styles.dateRange}
              key={'edudate-' + locale}
              style={{ animation: 'wordFade .55s .12s both' }}
            >
              {entry.start.split('-')[0]} — {entry.end.split('-')[0]}
              {entry.ongoing && (
                <span className={styles.dateOngoing}>
                  {' '}
                  &middot; {content.i18n.labels.ongoing[locale]}
                </span>
              )}
            </span>
            <span
              className={styles.where}
              key={'eduwhere-' + locale}
              style={{ animation: 'wordFade .55s .16s both' }}
            >
              {entry.where[locale]}
            </span>
          </div>

          {/* GPA column */}
          <div className={styles.gpaCol}>
            <div className={styles.gpaLabel}>{content.i18n.labels.gpaLabel[locale]}</div>
            <span className={styles.gpaNumber}>{entry.gpa}</span>
            <span className={styles.gpaScale}>/ {entry.gpaMax}</span>
          </div>
        </div>
      ))}
    </Section>
  );
}
