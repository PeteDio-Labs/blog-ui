import { useState, useEffect, useCallback } from 'react';
import { blogService } from '../services/blogService';
import type { BlogPost, PaginatedResponse } from '../types';

export function useBlogPosts(page = 1, size = 20) {
  const [data, setData] = useState<PaginatedResponse<BlogPost> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await blogService.getPosts(page, size);
      setData(response);
      setError(null);
    } catch (err) {
      setError('Failed to fetch posts.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, size]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts: data?.data ?? [],
    pagination: data?.pagination ?? null,
    loading,
    error,
    refresh: fetchPosts,
  };
}
