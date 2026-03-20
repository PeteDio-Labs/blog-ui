import React from 'react';
import { Link } from 'react-router';
import { type BlogPost } from '../../types';
import { formatDate } from '../../utils/dateFormatter';

interface FeaturedPostProps {
  post: BlogPost;
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ post }) => {
  const getTagClass = (index: number) => {
    const classes = ['tag-neon', 'tag-accent-pink', 'tag-accent-orange'];
    return classes[index % classes.length];
  };

  return (
    <Link to={`/blog/${post.slug}`} className="block group">
      <article className="glass-card border border-neon-cyan/20 overflow-hidden hover:border-neon-cyan/40 hover:shadow-lg hover:shadow-neon-cyan/10 transition-all duration-300">
        <div className="w-full h-96 bg-gradient-to-br from-neon-pink/20 via-neon-orange/20 to-neon-blue/30 flex items-center justify-center relative overflow-hidden">
          {post.coverImage ? (
            <img
              src={post.coverImage.url}
              alt={post.coverImage.altText}
              className="w-full h-full object-cover"
            />
          ) : (
            <svg className="w-32 h-32 text-neon-pink/40 group-hover:text-neon-orange/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent"></div>
        </div>

        <div className="p-8 -mt-24 relative z-10">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-neon-pink/20 text-neon-pink text-sm font-semibold rounded-full border border-neon-pink/50">
              Featured Post
            </span>
          </div>

          <h2 className="heading-neon-primary text-3xl md:text-4xl mb-4 group-hover:text-neon-pink transition-colors">
            {post.title}
          </h2>

          <p className="text-text-primary text-lg mb-6 line-clamp-3">
            {post.excerpt}
          </p>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag, index) => (
                <span key={tag} className={`${getTagClass(index)} text-sm`}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-neon-orange font-medium">{formatDate(post.publishedAt)}</span>
            <span className="px-6 py-3 bg-gradient-to-r from-neon-pink to-neon-orange text-dark-bg font-bold rounded-xl group-hover:shadow-neon-glow-orange transition-all duration-300 transform group-hover:scale-105">
              Read More →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default FeaturedPost;
