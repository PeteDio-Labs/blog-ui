import { Link } from 'react-router';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { BlogPost } from '../../types';

interface PostNavProps {
  previous: BlogPost | null;
  next: BlogPost | null;
}

export default function PostNav({ previous, next }: PostNavProps) {
  if (!previous && !next) return null;

  return (
    <nav className="mt-12 pt-8 border-t border-neon-cyan/20 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {previous ? (
        <Link
          to={`/posts/${previous.slug}`}
          className="card-neon group flex items-center gap-3 !p-4"
        >
          <ChevronLeft className="w-5 h-5 text-text-muted group-hover:text-neon-cyan transition-colors shrink-0" />
          <div className="min-w-0">
            <div className="text-xs text-text-muted uppercase tracking-wider">Previous</div>
            <div className="text-sm text-text-primary group-hover:text-neon-cyan transition-colors truncate">
              {previous.title}
            </div>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next && (
        <Link
          to={`/posts/${next.slug}`}
          className="card-neon group flex items-center gap-3 !p-4 text-right sm:justify-end"
        >
          <div className="min-w-0">
            <div className="text-xs text-text-muted uppercase tracking-wider">Next</div>
            <div className="text-sm text-text-primary group-hover:text-neon-cyan transition-colors truncate">
              {next.title}
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-neon-cyan transition-colors shrink-0" />
        </Link>
      )}
    </nav>
  );
}
