import React from 'react';
import { type BlogPost } from '../../types';
import BlogCard from './BlogCard';

interface RecentPostsProps {
  posts: BlogPost[];
}

const RecentPosts: React.FC<RecentPostsProps> = ({ posts }) => {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="heading-neon-primary text-2xl md:text-3xl mb-6">
        Recent Posts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default RecentPosts;
