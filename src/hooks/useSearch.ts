import { useState, useEffect } from 'react';
import { blogService } from '../services/blogService';
import type { BlogPost } from '../types';
import { useDebounce } from './useDebounce';

export function useSearch(initialQuery = '') {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    const search = async () => {
      setLoading(true);
      try {
        const response = await blogService.searchPosts(debouncedQuery);
        setResults(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to perform search.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    search();
  }, [debouncedQuery]);

  return { query, setQuery, results, loading, error };
}
