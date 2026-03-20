import React from 'react';
import { Link } from 'react-router';
import { type BlogPost } from '../../types';
import { formatDate } from '../../utils/dateFormatter';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const getTagClass = (index: number) => {
    const classes = ['tag-neon', 'tag-accent-pink', 'tag-accent-orange'];
    return classes[index % classes.length];
  };

  return (
    <Link to={`/blog/${post.slug}`} className="block group">
        <article className="glass-card border border-neon-cyan/20 h-full flex flex-col hover:border-neon-cyan/40 hover:shadow-lg hover:shadow-neon-cyan/10 transition-all duration-300">
            <div className="w-full h-48 bg-gradient-to-br from-neon-pink/10 via-neon-orange/10 to-neon-blue/20 rounded-t-2xl flex items-center justify-center">
              <svg className="w-16 h-16 text-neon-pink/40 group-hover:text-neon-orange/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-neon-green mb-2 group-hover:text-neon-pink transition-colors">
                    {post.title}
                </h3>
                <p className="text-text-primary mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <span key={tag} className={`${getTagClass(index)} text-xs`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-neon-orange text-sm">{formatDate(post.publishedAt)}</span>
                    <span className="text-neon-blue font-medium group-hover:text-neon-pink transition-colors text-sm">Read more →</span>
                </div>
            </div>
        </article>
    </Link>
  );
};

export default BlogCard;
