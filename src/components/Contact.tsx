/**
 * Contact section -- headline with accent word and email pill button.
 *
 * Email pill links to mailto: with envelope icon.
 */
import { useLocale } from '@/contexts/LocaleContext';
import { content } from '@/config/content';
import AnimatedText from '@/components/AnimatedText';
import Section from '@/components/Section';
import styles from './Contact.module.css';

export default function Contact() {
  const locale = useLocale();

  // Contact heading — separate from the kicker label
  const heading = content.i18n.labels.contactHeading[locale];

  return (
    <Section
      id="contact"
      index="05"
      label={content.i18n.labels.contact[locale].toLocaleUpperCase(
        locale === 'tr' ? 'tr-TR' : 'en-US',
      )}
      revealKey={locale}
      className={styles.section}
      containerClassName={styles.container}
      kickerClassName={styles.kicker}
    >
      <div className={styles.grid}>
        <div>
          <h2 className={styles.heading} key={'ch-' + locale}>
            <AnimatedText text={heading} animKey={locale} />.
          </h2>
          <a href={`mailto:${content.links.email}`} className={styles.emailPill}>
            <svg
              className={styles.emailIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-10 7L2 7" />
            </svg>
            {content.links.email}
          </a>
        </div>
      </div>
    </Section>
  );
}
