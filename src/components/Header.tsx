/**
 * Header -- sticky navigation bar with nav links, theme toggle, and language toggle.
 *
 * Layout (left to right):
 * - Logo: "Bedirhan." with accent dot
 * - Nav (hidden on mobile): 5 section links with index numbers
 * - Controls: social icons (responsive), separator, language toggle, theme toggle
 *
 * Responsive behavior:
 * - Desktop (>=1024): all social icons (GitHub, LinkedIn, Email)
 * - Tablet (641-1023): email icon only
 * - Mobile (<=640): lang + theme toggles only
 */
import { useLocale } from '@/contexts/LocaleContext';
import { content } from '@/config/content';
import AnimatedText from '@/components/AnimatedText';
import { EnvelopeIcon, GitHubIcon, LinkedInIcon, SunIcon, MoonIcon } from '@/components/Icons';
import styles from './Header.module.css';

interface HeaderProps {
  onSwitchLocale: (locale: 'en' | 'tr') => void;
  onToggleTheme: (e?: React.MouseEvent) => void;
}

const NAV_ITEMS = [
  { id: 'profile', index: '01', key: 'profile' as const },
  { id: 'projects', index: '02', key: 'projects' as const },
  { id: 'experience', index: '03', key: 'experience' as const },
  { id: 'education', index: '04', key: 'education' as const },
  { id: 'contact', index: '05', key: 'contact' as const },
];

export default function Header({ onSwitchLocale, onToggleTheme }: HeaderProps) {
  const locale = useLocale();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <a href="/" className={styles.logo}>
          Bedirhan<span className={styles.dot}>.</span>
        </a>

        {/* Nav links (hidden on mobile) */}
        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id + locale}
              href={`#${item.id}`}
              className={styles.navLink}
              onClick={(e) => handleNavClick(e, item.id)}
            >
              <span className={styles.navIndex}>{item.index}</span>
              <AnimatedText text={content.i18n.nav[item.key][locale]} animKey={locale} />
            </a>
          ))}
        </nav>

        {/* Controls */}
        <div className={styles.controls}>
          {/* Desktop social icons: GitHub, LinkedIn, Email */}
          <div className={styles.socialDesktop}>
            <a
              href={content.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
              aria-label="GitHub"
            >
              <GitHubIcon />
            </a>
            <a
              href={content.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>
            <a
              href={`mailto:${content.links.email}`}
              className={styles.iconLink}
              aria-label={content.i18n.labels.email[locale]}
            >
              <EnvelopeIcon />
            </a>
          </div>

          {/* Tablet social: email only */}
          <div className={styles.socialTablet}>
            <a
              href={`mailto:${content.links.email}`}
              className={styles.iconLink}
              aria-label={content.i18n.labels.email[locale]}
            >
              <EnvelopeIcon />
            </a>
          </div>

          <span className={styles.separator} />

          {/* Language toggle -- pill-style EN/TR switcher */}
          <div
            className={styles.langPill}
            role="radiogroup"
            aria-label={content.i18n.labels.language[locale]}
          >
            <button
              type="button"
              className={locale === 'en' ? styles.langBtnActive : styles.langBtn}
              onClick={() => onSwitchLocale('en')}
              aria-checked={locale === 'en'}
              role="radio"
            >
              EN
            </button>
            <button
              type="button"
              className={locale === 'tr' ? styles.langBtnActive : styles.langBtn}
              onClick={() => onSwitchLocale('tr')}
              aria-checked={locale === 'tr'}
              role="radio"
            >
              TR
            </button>
          </div>

          {/* Theme toggle — both icons always rendered to avoid hydration mismatch.
               CSS (html[data-theme]) controls which icon is visible. */}
          <button
            type="button"
            className={styles.themeBtn}
            onClick={onToggleTheme}
            aria-label={content.i18n.labels.toggleTheme[locale]}
          >
            <span className={styles.sunIcon} aria-hidden="true">
              <SunIcon />
            </span>
            <span className={styles.moonIcon} aria-hidden="true">
              <MoonIcon />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
