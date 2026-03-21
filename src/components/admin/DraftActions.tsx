import { Send, EyeOff, Trash2 } from 'lucide-react';

interface DraftActionsProps {
  onPublish: () => void;
  onUnlisted: () => void;
  onReject: () => void;
  loading?: boolean;
}

export default function DraftActions({ onPublish, onUnlisted, onReject, loading }: DraftActionsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={onPublish}
        disabled={loading}
        className="btn-cta flex items-center gap-2 !text-sm"
      >
        <Send className="w-4 h-4" />
        Publish
      </button>
      <button
        onClick={onUnlisted}
        disabled={loading}
        className="btn-secondary flex items-center gap-2 !text-sm"
      >
        <EyeOff className="w-4 h-4" />
        Unlisted
      </button>
      <button
        onClick={onReject}
        disabled={loading}
        className="px-4 py-2 border border-error/40 text-error rounded-xl text-sm font-medium hover:bg-error/10 transition-all flex items-center gap-2"
      >
        <Trash2 className="w-4 h-4" />
        Reject
      </button>
    </div>
  );
}
