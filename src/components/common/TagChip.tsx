import { Link } from 'react-router';
import clsx from 'clsx';

interface TagChipProps {
  slug: string;
  name: string;
  count?: number;
  active?: boolean;
}

export default function TagChip({ slug, name, count, active }: TagChipProps) {
  return (
    <Link
      to={`/tags/${slug}`}
      className={clsx(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 border',
        active
          ? 'bg-accent-primary/20 text-accent-primary border-accent-primary shadow-neon-cyan'
          : 'bg-transparent text-text-secondary border-accent-tertiary/30 hover:border-accent-primary hover:text-accent-primary'
      )}
    >
      {name}
      {count !== undefined && (
        <span className="text-text-muted">{count}</span>
      )}
    </Link>
  );
}
