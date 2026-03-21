import { Link } from 'react-router';
import { Calendar, Clock, Eye } from 'lucide-react';
import { formatDate } from '../../utils/dateFormatter';
import { estimateReadTime } from '../../utils/readTime';
import type { BlogPost } from '../../types';

interface PostMetaProps {
  post: BlogPost;
}

export default function PostMeta({ post }: PostMetaProps) {
  const readTime = estimateReadTime(post.content);

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-text-secondary">
      {post.publishedAt && (
        <span className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          {formatDate(post.publishedAt)}
        </span>
      )}
      <span className="flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5" />
        {readTime} min read
      </span>
      {post.viewCount > 0 && (
        <span className="flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5" />
          {post.viewCount.toLocaleString()} views
        </span>
      )}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <Link
              key={tag.id}
              to={`/tags/${tag.slug}`}
              className="tag-neon text-xs"
            >
              {tag.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
