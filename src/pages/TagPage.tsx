import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import { useTags } from '../hooks/useTags';
import BlogCard from '../components/blog/BlogCard';
import Spinner from '../components/common/Spinner';
import ErrorMessage from '../components/common/ErrorMessage';
import Pagination from '../components/common/Pagination';
import TagChip from '../components/common/TagChip';
import { blogService } from '../services/blogService';
import type { BlogPost, PaginatedResponse } from '../types';

function usePostsByTag(tag: string | undefined, page: number) {
  const [data, setData] = useState<PaginatedResponse<BlogPost> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    if (!tag) return;
    setLoading(true);
    try {
      const res = await blogService.getPostsByTag(tag, page);
      setData(res);
      setError(null);
    } catch {
      setError('Failed to fetch posts.');
    } finally {
      setLoading(false);
    }
  }, [tag, page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { data, loading, error };
}

export default function TagPage() {
  const { tag } = useParams<{ tag: string }>();
  const { tags } = useTags();
  const [page, setPage] = useState(1);
  const { data, loading, error } = usePostsByTag(tag, page);

  const tagInfo = tags.find((t) => t.slug === tag);

  return (
    <article className="space-y-6 max-w-5xl">
      <h1 className="heading-neon-primary">
        {tagInfo ? tagInfo.name : tag}
      </h1>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <TagChip
              key={t.id}
              slug={t.slug}
              name={t.name}
              count={t.postCount}
              active={t.slug === tag}
            />
          ))}
        </div>
      )}

      {loading && <Spinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && data && (
        <>
          {data.data.length === 0 ? (
            <p className="text-text-muted text-center py-12">No posts with this tag.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.data.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
          {data.pagination && (
            <Pagination page={page} totalPages={data.pagination.totalPages} onPageChange={setPage} />
          )}
        </>
      )}
    </article>
  );
}
