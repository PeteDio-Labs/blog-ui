import { useState, useEffect, useCallback } from 'react';

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function useTableOfContents(content: string) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // Extract headings from markdown content (h2, h3)
  const extractHeadings = useCallback((md: string): TocItem[] => {
    const headings: TocItem[] = [];
    const lines = md.split('\n');
    for (const line of lines) {
      const match = line.match(/^(#{2,3})\s+(.+)/);
      if (match) {
        const level = match[1].length;
        const text = match[2].replace(/[*_`[\]]/g, '').trim();
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        headings.push({ id, text, level });
      }
    }
    return headings;
  }, []);

  useEffect(() => {
    setItems(extractHeadings(content));
  }, [content, extractHeadings]);

  // IntersectionObserver for active heading
  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  return { items, activeId };
}
