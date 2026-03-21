import { Link } from 'react-router';
import { motion, useReducedMotion } from 'framer-motion';
import { useBlogPosts } from '../hooks/useBlogPosts';
import PostCard from '../components/post/PostCard';
import Spinner from '../components/common/Spinner';
import ErrorMessage from '../components/common/ErrorMessage';

export default function Home() {
  const { posts, loading, error } = useBlogPosts(1, 10);
  const prefersReducedMotion = useReducedMotion();

  const featured = posts.find((p) => p.isFeatured) ?? posts[0] ?? null;
  const rest = posts.filter((p) => p !== featured);

  const fade = prefersReducedMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <article className="space-y-8 max-w-5xl">
      {/* Featured / Latest */}
      {featured && (
        <motion.section
          variants={fade}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.35 }}
          className="card-featured glass-card p-6 md:p-8"
        >
          <div className="text-xs text-accent-tertiary uppercase tracking-[0.2em] mb-3">
            {featured.isFeatured ? 'Featured' : 'Latest'}
          </div>
          <Link to={`/posts/${featured.slug}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-accent-heading hover:text-neon-cyan transition-colors">
              {featured.title}
            </h2>
          </Link>
          {featured.excerpt && (
            <p className="mt-3 text-text-primary line-clamp-3">{featured.excerpt}</p>
          )}
          {featured.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {featured.tags.map((tag) => (
                <Link key={tag.id} to={`/tags/${tag.slug}`} className="tag-neon text-xs">
                  {tag.name}
                </Link>
              ))}
            </div>
          )}
          <Link
            to={`/posts/${featured.slug}`}
            className="inline-flex items-center gap-2 mt-4 text-accent-tertiary font-medium hover:text-neon-cyan transition-colors"
          >
            Read more <span aria-hidden>&rarr;</span>
          </Link>
        </motion.section>
      )}

      {/* Recent Posts */}
      {rest.length > 0 && (
        <motion.section
          variants={fade}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          <h2 className="heading-neon-secondary mb-4">Recent Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link to="/posts" className="btn-secondary !text-sm">
              View all posts
            </Link>
          </div>
        </motion.section>
      )}

      {posts.length === 0 && (
        <p className="text-text-muted text-center py-16">No posts yet.</p>
      )}
    </article>
  );
}
