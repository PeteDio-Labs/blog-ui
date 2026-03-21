import { useState, useEffect } from 'react';
import { blogService } from '../services/blogService';
import type { Tag } from '../types';

export function useTags() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogService
      .getInfo()
      .then((info) => setTags(info.tags ?? []))
      .catch((err) => console.error('Failed to fetch tags:', err))
      .finally(() => setLoading(false));
  }, []);

  return { tags, loading };
}
