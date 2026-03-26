import React from 'react';
import { type BlogPost } from '../../types';
import BlogCard from './BlogCard';
import Spinner from '../common/Spinner';
import ErrorMessage from '../common/ErrorMessage';

interface BlogListProps {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
}

const BlogList: React.FC<BlogListProps> = ({ posts, loading, error }) => {
  if (loading && posts.length === 0) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (posts.length === 0) {
    return <p className="text-center text-neon-meta">No posts found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {posts.map(post => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogList;