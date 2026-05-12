import React from 'react';
import { Link } from 'react-router';
import { type BlogPost } from '../../types';
import { formatDate } from '../../utils/dateFormatter';
import { estimateReadTime } from '../../utils/readTime';

interface BlogCardProps {
  post: BlogPost;
  /** Optional background image URL — falls back to a gradient when omitted */
  imageUrl?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, imageUrl }) => {
  const readTime = post.readTimeMinutes ?? estimateReadTime(post.content ?? '');

  const getTagClass = (index: number) => {
    const classes = ['tag-neon', 'tag-accent-pink', 'tag-accent-orange'];
    return classes[index % classes.length];
  };

  return (
    <Link to={`/posts/${post.slug}`} className="block group">
      <article className="blog-card glass-card border border-neon-cyan/20 h-full flex flex-col overflow-hidden hover:border-neon-cyan/40 transition-all duration-300">
        {/* ── Hero image / gradient zone ── */}
        <div className="blog-card__hero relative w-full h-52 overflow-hidden">
          {/* Background: image or gradient */}
          {imageUrl ? (
            <img
              src={imageUrl}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/20 via-neon-orange/15 to-neon-blue/25 transition-opacity duration-300" />
          )}

          {/* Gradient scrim for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent" />

          {/* Decorative glow orbs (subtle animated depth) */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-neon-pink/15 rounded-full blur-2xl group-hover:bg-neon-pink/25 transition-all duration-700" />
          <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-neon-blue/15 rounded-full blur-2xl group-hover:bg-neon-blue/25 transition-all duration-700" />

          {/* Featured badge */}
          {post.isFeatured && (
            <span className="absolute top-4 left-4 z-10 inline-block px-3 py-1 bg-neon-pink/20 text-neon-pink text-xs font-semibold rounded-full border border-neon-pink/50 backdrop-blur-sm">
              Featured
            </span>
          )}

          {/* Placeholder icon when there's no image */}
          {!imageUrl && (
            <svg
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 text-neon-pink/30 group-hover:text-neon-orange/50 transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          )}

          {/* Meta overlay: date + read time pinned to bottom of hero */}
          <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center gap-2 text-xs">
            {post.publishedAt && (
              <span className="text-neon-orange font-medium">
                {formatDate(post.publishedAt)}
              </span>
            )}
            {post.publishedAt && <span className="text-text-muted">&middot;</span>}
            <span className="text-text-muted">{readTime} min read</span>
          </div>
        </div>

        {/* ── Content zone ── */}
        <div className="p-6 relative z-10 flex flex-col flex-grow">

          {/* Title */}
          <h3 className="text-xl font-bold text-accent-heading leading-snug mb-2 group-hover:text-neon-pink transition-colors duration-200">
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-text-primary text-sm mb-4 line-clamp-3 flex-grow">
              {post.excerpt}
            </p>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag, index) => (
                <span key={tag.id} className={`${getTagClass(index)} text-xs`}>
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Read more CTA */}
          <div className="mt-auto pt-2">
            <span className="inline-flex items-center gap-1.5 text-neon-blue text-sm font-medium group-hover:text-neon-pink transition-colors duration-200">
              Read more
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
