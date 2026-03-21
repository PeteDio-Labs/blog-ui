import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className={clsx(
          'p-2 rounded-lg transition-all',
          page <= 1 ? 'text-text-muted cursor-not-allowed' : 'text-text-secondary hover:text-neon-cyan hover:bg-white/[0.06]'
        )}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <span className="text-sm text-text-secondary px-3">
        {page} / {totalPages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className={clsx(
          'p-2 rounded-lg transition-all',
          page >= totalPages ? 'text-text-muted cursor-not-allowed' : 'text-text-secondary hover:text-neon-cyan hover:bg-white/[0.06]'
        )}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
