import { useState, useEffect, useCallback } from 'react';
import { adminService } from '../services/adminService';
import type { BlogPost } from '../types';

export function useDrafts() {
  const [drafts, setDrafts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [available, setAvailable] = useState(true);

  const fetchDrafts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminService.getDrafts();
      setDrafts(res.data);
      setError(null);
      setAvailable(true);
    } catch (err) {
      // 403 means network-gated — hide admin section
      if (err instanceof Error && err.message.includes('403')) {
        setAvailable(false);
      } else {
        setError('Failed to fetch drafts.');
      }
      setDrafts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDrafts();
  }, [fetchDrafts]);

  return { drafts, loading, error, available, refresh: fetchDrafts };
}
