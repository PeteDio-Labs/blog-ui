import { Link } from 'react-router';
import { formatDate } from '../../utils/dateFormatter';
import { estimateReadTime } from '../../utils/readTime';
import type { BlogPost } from '../../types';

interface PostCardProps {
  post: BlogPost;
}

export default function PostCard({ post }: PostCardProps) {
  const readTime = estimateReadTime(post.content);

  return (
    <Link to={`/posts/${post.slug}`} className="block card-neon group">
      <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted mb-2">
        {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
        <span>&middot;</span>
        <span>{readTime} min read</span>
        {post.isFeatured && (
          <span className="tag-neon-success text-[10px] !py-0 !px-2">Featured</span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-accent-heading group-hover:text-neon-cyan transition-colors line-clamp-2">
        {post.title}
      </h3>
      {post.excerpt && (
        <p className="mt-2 text-sm text-text-secondary line-clamp-2">
          {post.excerpt}
        </p>
      )}
      {post.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag.id} className="tag-neon text-xs">
              {tag.name}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
