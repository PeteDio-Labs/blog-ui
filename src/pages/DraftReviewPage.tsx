import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { adminService } from '../services/adminService';
import DraftEditor from '../components/admin/DraftEditor';
import DraftActions from '../components/admin/DraftActions';
import Spinner from '../components/common/Spinner';
import ErrorMessage from '../components/common/ErrorMessage';
import type { BlogPost } from '../types';

export default function DraftReviewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [draft, setDraft] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    adminService
      .getDraft(Number(id))
      .then((d) => { setDraft(d); setError(null); })
      .catch(() => setError('Failed to load draft.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handlePublish = async () => {
    if (!id) return;
    setActionLoading(true);
    try {
      await adminService.publishDraft(Number(id));
      navigate('/admin/drafts');
    } catch {
      setError('Failed to publish.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUnlisted = async () => {
    if (!id) return;
    setActionLoading(true);
    try {
      await adminService.updateDraft(Number(id), { status: 'UNLISTED' });
      navigate('/admin/drafts');
    } catch {
      setError('Failed to update.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!id) return;
    setActionLoading(true);
    try {
      await adminService.rejectDraft(Number(id));
      navigate('/admin/drafts');
    } catch {
      setError('Failed to reject.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleSave = async (updates: { title: string; content: string; excerpt: string }) => {
    if (!id) return;
    setActionLoading(true);
    try {
      const updated = await adminService.updateDraft(Number(id), updates);
      setDraft(updated);
    } catch {
      setError('Failed to save.');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (error && !draft) return <ErrorMessage message={error} />;
  if (!draft) return <ErrorMessage message="Draft not found." />;

  return (
    <article className="space-y-6 max-w-4xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-accent-heading">{draft.title}</h1>
          <div className="mt-1 text-sm text-text-muted">
            <span className="badge-draft mr-2">{draft.source}</span>
            Draft
          </div>
        </div>
        <DraftActions
          onPublish={handlePublish}
          onUnlisted={handleUnlisted}
          onReject={handleReject}
          loading={actionLoading}
        />
      </div>

      {error && <ErrorMessage message={error} />}

      <DraftEditor
        title={draft.title}
        content={draft.content}
        excerpt={draft.excerpt ?? ''}
        onSave={handleSave}
        loading={actionLoading}
      />
    </article>
  );
}
