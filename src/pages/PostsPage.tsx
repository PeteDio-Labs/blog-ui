import { useState } from 'react';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { useTags } from '../hooks/useTags';
import PostList from '../components/post/PostList';
import TagChip from '../components/common/TagChip';
import Pagination from '../components/common/Pagination';

export default function PostsPage() {
  const [page, setPage] = useState(1);
  const { posts, pagination, loading, error } = useBlogPosts(page);
  const { tags } = useTags();

  return (
    <article className="space-y-6 max-w-5xl">
      <h1 className="heading-neon-primary">All Posts</h1>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <TagChip key={tag.id} slug={tag.slug} name={tag.name} count={tag.postCount} />
          ))}
        </div>
      )}

      <PostList posts={posts} loading={loading} error={error} />

      {pagination && (
        <Pagination page={page} totalPages={pagination.totalPages} onPageChange={setPage} />
      )}
    </article>
  );
}
