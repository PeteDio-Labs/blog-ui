import BlogCard from '../blog/BlogCard';
import Spinner from '../common/Spinner';
import ErrorMessage from '../common/ErrorMessage';
import type { BlogPost } from '../../types';

interface PostListProps {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
}

export default function PostList({ posts, loading, error }: PostListProps) {
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (posts.length === 0) {
    return <p className="text-text-muted text-center py-12">No posts yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
