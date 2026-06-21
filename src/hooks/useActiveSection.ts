/**
 * useActiveSection -- IntersectionObserver-based active section tracking.
 *
 * Observes section elements by ID and reports which section's heading
 * is closest to the top of the viewport. The active zone covers the top
 * half of the viewport with multiple thresholds to track which section
 * dominates the visible area.
 *
 * SSR-safe: returns first section ID when document is unavailable.
 */
import { useState, useEffect, useRef } from 'react';

export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');
  const ratios = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    if (typeof document === 'undefined') return;

    ratios.current.clear();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.current.set(entry.target.id, entry.intersectionRatio);
        }

        // Pick the section with the highest visibility ratio
        let best = '';
        let bestRatio = 0;
        for (const [id, ratio] of ratios.current) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        }
        // When scrolled to the bottom, the last section wins even with low ratio
        const atBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
        const lastId = sectionIds[sectionIds.length - 1];
        if (atBottom && lastId && ratios.current.has(lastId)) {
          best = lastId;
        }
        if (best) setActiveId(best);
      },
      {
        rootMargin: '-54px 0px -60% 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
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
