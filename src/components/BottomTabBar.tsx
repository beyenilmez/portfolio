/**
 * BottomTabBar -- mobile-only section navigation.
 *
 * Fixed pill bar at bottom of viewport (<=640px), hidden on tablet/desktop.
 * Uses IntersectionObserver via useActiveSection to highlight the current section.
 * Tapping a tab smooth-scrolls to the corresponding section.
 */
import { useCallback } from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import { useActiveSection } from '@/hooks/useActiveSection';
import { content } from '@/config/content';
import styles from './BottomTabBar.module.css';

const SECTION_IDS = ['profile', 'projects', 'experience', 'education', 'contact'] as const;

export default function BottomTabBar() {
  const locale = useLocale();
  const activeId = useActiveSection([...SECTION_IDS]);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <nav className={styles.tabBar} aria-label="Section navigation">
      {SECTION_IDS.map((id) => (
        <button
          key={id}
          className={activeId === id ? styles.tabActive : styles.tab}
          onClick={() => scrollTo(id)}
          type="button"
        >
          {content.i18n.nav[id][locale]}
        </button>
      ))}
    </nav>
  );
}
