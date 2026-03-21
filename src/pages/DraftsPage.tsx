import { useDrafts } from '../hooks/useDrafts';
import DraftList from '../components/admin/DraftList';
import Spinner from '../components/common/Spinner';
import ErrorMessage from '../components/common/ErrorMessage';

export default function DraftsPage() {
  const { drafts, loading, error, available } = useDrafts();

  if (!available) {
    return <ErrorMessage message="Admin access is not available on this network." />;
  }

  return (
    <article className="space-y-6 max-w-3xl">
      <h1 className="heading-neon-primary">
        Drafts
        {drafts.length > 0 && (
          <span className="text-lg text-text-muted font-normal ml-3">
            ({drafts.length} pending review)
          </span>
        )}
      </h1>

      {loading && <Spinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && <DraftList drafts={drafts} />}
    </article>
  );
}
