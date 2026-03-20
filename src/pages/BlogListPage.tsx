import React from 'react';
import { useBlogPosts } from '../hooks/useBlogPosts';
import BlogList from '../components/blog/BlogList';

const BlogListPage: React.FC = () => {
  const { posts, loading, error } = useBlogPosts();

  return (
    <article className="space-y-6">
      <h1 className="heading-neon-primary">
        All Blog Posts
      </h1>
      <BlogList posts={posts} loading={loading && posts.length === 0} error={error} />
    </article>
  );
};

export default BlogListPage;
