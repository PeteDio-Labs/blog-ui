import { Link } from 'react-router';
import { formatDate } from '../../utils/dateFormatter';
import type { BlogPost } from '../../types';

interface DraftListProps {
  drafts: BlogPost[];
}

export default function DraftList({ drafts }: DraftListProps) {
  if (drafts.length === 0) {
    return <p className="text-text-muted text-center py-12">No drafts pending review.</p>;
  }

  return (
    <div className="space-y-3">
      {drafts.map((draft) => (
        <Link
          key={draft.id}
          to={`/admin/drafts/${draft.id}`}
          className="block card-neon group"
        >
          <h3 className="text-lg font-semibold text-accent-heading group-hover:text-neon-cyan transition-colors">
            {draft.title}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-text-muted">
            <span className="badge-draft">{draft.source}</span>
            <span>&middot;</span>
            <span>{formatDate(draft.createdAt)}</span>
          </div>
          {draft.excerpt && (
            <p className="mt-2 text-sm text-text-secondary line-clamp-2">{draft.excerpt}</p>
          )}
        </Link>
      ))}
    </div>
  );
}
