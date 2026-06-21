/**
 * Footer -- external links (GitHub, LinkedIn, CV EN, CV TR, Email) and dynamic copyright.
 *
 * All external links use target="_blank" rel="noopener noreferrer" — closes the
 * tabnabbing vector and prevents the new tab from inheriting the opener's
 * window reference.
 */
import { content } from '@/config/content';
import styles from './Footer.module.css';

interface FooterLink {
  href: string;
  label: string;
  isMailto?: boolean;
}

export default function Footer() {
  const links: FooterLink[] = [
    { href: content.links.github, label: 'GitHub' },
    { href: content.links.linkedin, label: 'LinkedIn' },
    { href: content.links.cvEn, label: 'CV (EN)' },
    { href: content.links.cvTr, label: 'CV (TR)' },
    { href: `mailto:${content.links.email}`, label: 'Email', isMailto: true },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <nav className={styles.links}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.arrow}>&#x2197;</span> {link.label}
            </a>
          ))}
        </nav>
        <span className={styles.copyright}>
          &copy; {new Date().getFullYear()} BEDIRHAN YENILMEZ
        </span>
      </div>
    </footer>
  );
}
