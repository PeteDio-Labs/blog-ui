import { useState } from 'react';
import PostReader from '../post/PostReader';

interface DraftEditorProps {
  title: string;
  content: string;
  excerpt: string;
  onSave: (updates: { title: string; content: string; excerpt: string }) => void;
  loading?: boolean;
}

export default function DraftEditor({ title, content, excerpt, onSave, loading }: DraftEditorProps) {
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);
  const [editExcerpt, setEditExcerpt] = useState(excerpt);
  const [preview, setPreview] = useState(true);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setPreview(true)}
          className={preview ? 'btn-primary !text-sm !px-4 !py-2' : 'btn-secondary !text-sm !px-4 !py-2'}
        >
          Preview
        </button>
        <button
          onClick={() => setPreview(false)}
          className={!preview ? 'btn-primary !text-sm !px-4 !py-2' : 'btn-secondary !text-sm !px-4 !py-2'}
        >
          Edit
        </button>
        {!preview && (
          <button
            onClick={() => onSave({ title: editTitle, content: editContent, excerpt: editExcerpt })}
            disabled={loading}
            className="btn-cta !text-sm !px-4 !py-2 ml-auto"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        )}
      </div>

      {preview ? (
        <PostReader content={editContent} />
      ) : (
        <div className="space-y-3">
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="input-neon w-full text-lg font-semibold"
            placeholder="Title"
          />
          <input
            value={editExcerpt}
            onChange={(e) => setEditExcerpt(e.target.value)}
            className="input-neon w-full text-sm"
            placeholder="Excerpt"
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="input-neon w-full min-h-[400px] font-mono text-sm"
            placeholder="Markdown content..."
          />
        </div>
      )}
    </div>
  );
}
