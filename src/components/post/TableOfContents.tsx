import clsx from 'clsx';
import type { TocItem } from '../../hooks/useTableOfContents';

interface TableOfContentsProps {
  items: TocItem[];
  activeId: string;
}

export default function TableOfContents({ items, activeId }: TableOfContentsProps) {
  if (items.length === 0) return null;

  return (
    <div className="sticky top-24 glass-card border border-neon-cyan/20 p-4 text-sm">
      <div className="text-sm font-bold text-neon-cyan mb-4 tracking-[0.15em] uppercase">
        On this page
      </div>
      <nav>
        <ul className="space-y-1.5">
          {items.map((item) => (
            <li key={item.id} className={item.level === 3 ? 'ml-3' : ''}>
              <a
                href={`#${item.id}`}
                className={clsx(
                  'block py-0.5 transition-colors duration-200',
                  activeId === item.id
                    ? 'text-neon-cyan font-medium'
                    : 'text-text-secondary hover:text-neon-cyan'
                )}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
