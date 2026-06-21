/**
 * useActiveSection -- IntersectionObserver-based active section tracking.
 *
 * Observes section elements by ID and reports which section is currently
 * in the viewport's "active zone" (middle 5% band via rootMargin).
 * Used by BottomTabBar to highlight the current section tab.
 *
 * SSR-safe: returns first section ID when document is unavailable.
 */
import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      {
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0,
      },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
