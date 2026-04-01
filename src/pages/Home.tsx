import React from 'react';
import { Link } from 'react-router';
import { motion, useReducedMotion } from 'framer-motion';
import FeaturedPost from '../components/blog/FeaturedPost';
import RecentPosts from '../components/blog/RecentPosts';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { formatDate } from '../utils/dateFormatter';

const Home: React.FC = () => {
  const { posts, loading, error } = useBlogPosts();
  const prefersReducedMotion = useReducedMotion();

  const featuredPost = posts.find((p) => p.isFeatured) ?? posts[0] ?? null;
  const recentPosts = posts.filter((p) => p !== featuredPost).slice(0, 3);

  const ease = [0.16, 1, 0.3, 1] as const;

  const heroTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.55, ease };

  const heroItem = prefersReducedMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } };

  return (
    <article className="space-y-8">
      {/* Hero (Editorial) */}
      <motion.section
        initial="hidden"
        animate="show"
        transition={{
          duration: heroTransition.duration,
          ease: heroTransition.ease,
          staggerChildren: prefersReducedMotion ? 0 : 0.06,
        }}
        className="relative overflow-hidden glass-card border border-neon-cyan/20 p-6 md:p-10"
      >
        {/* Decorative accents */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-neon-pink/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-neon-orange/10 rounded-full blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <motion.div variants={heroItem} className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <span className="text-neon-blue tracking-[0.22em] uppercase">Field Notes</span>
              <span className="text-neon-cyan/70">&bull;</span>
              <span className="text-text-secondary">Homelabs &bull; Infrastructure &bull; Shipping</span>
            </motion.div>

            <motion.h1
              variants={heroItem}
              className="mt-5 text-4xl md:text-6xl font-bold text-neon-green leading-[1.05] tracking-tight"
            >
              Welcome to my living
              <span className="block">
                <span className="text-neon-pink">portfolio</span>
                <span className="text-neon-cyan"> </span>
                <span className="text-neon-cyan/70">&amp;</span>
                <span className="text-neon-cyan"> </span>
                <span className="text-neon-orange">blog</span>
              </span>
            </motion.h1>

            <motion.p variants={heroItem} className="mt-6 text-lg md:text-xl text-text-primary max-w-2xl">
              I&rsquo;m <span className="text-neon-pink font-semibold">Pedro</span> &mdash; a software engineer and project manager.
              I write about building systems, running experiments, and documenting the process.
            </motion.p>

            <motion.div variants={heroItem} className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/posts" className="btn-cta !text-dark-bg hover:!text-dark-bg">
                Read the blog
              </Link>
              <Link to="/search" className="btn-secondary">
                Search
              </Link>
            </motion.div>

            {featuredPost && (
              <motion.div variants={heroItem} className="mt-10">
                <div className="text-neon-blue text-sm tracking-[0.22em] uppercase mb-2">Latest</div>
                <Link
                  to={`/posts/${featuredPost.slug}`}
                  className="block border-l-2 border-neon-cyan/40 pl-4 hover:border-neon-cyan transition-colors"
                >
                  <div className="text-neon-green font-semibold text-lg hover:text-neon-pink transition-colors">
                    {featuredPost.title}
                  </div>
                  <div className="text-neon-meta mt-1">{featuredPost.publishedAt ? formatDate(featuredPost.publishedAt) : ''}</div>
                </Link>
              </motion.div>
            )}
          </div>

          <motion.aside variants={heroItem} className="lg:col-span-5">
            <div className="glass-card border border-neon-cyan/20 p-6 md:p-7">
              <div className="flex items-center justify-between gap-4">
                <span className="text-neon-blue text-sm tracking-[0.22em] uppercase">Featured</span>
                {!loading && featuredPost?.publishedAt && (
                  <span className="text-neon-orange text-sm">{formatDate(featuredPost.publishedAt)}</span>
                )}
              </div>

              {loading && (
                <div className="mt-6 text-neon-cyan">Loading&hellip;</div>
              )}

              {error && (
                <div className="mt-6 text-neon-pink">{error}</div>
              )}

              {!loading && !error && featuredPost && (
                <>
                  <h2 className="mt-5 text-2xl md:text-3xl font-bold text-neon-green leading-snug">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-4 text-text-primary line-clamp-4">
                    {featuredPost.excerpt}
                  </p>

                  {featuredPost.tags && featuredPost.tags.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {featuredPost.tags.slice(0, 4).map((tag, index) => (
                        <span
                          key={tag.id}
                          className={`${['tag-neon', 'tag-accent-pink', 'tag-accent-orange'][index % 3]} text-xs`}
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-6">
                    <Link
                      to={`/posts/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 text-neon-blue font-medium hover:text-neon-pink transition-colors"
                    >
                      Read featured
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </motion.aside>
        </div>
      </motion.section>

      {/* Featured Post Section */}
      {loading && (
        <div className="text-center text-neon-cyan">Loading featured post...</div>
      )}

      {error && (
        <div className="text-center text-neon-pink">{error}</div>
      )}

      {!loading && !error && featuredPost && (
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.35, ease: 'easeOut' }}
        >
          <FeaturedPost post={featuredPost} />
        </motion.div>
      )}

      {/* Recent Posts Section */}
      {!loading && !error && recentPosts.length > 0 && (
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.35, ease: 'easeOut' }}
        >
          <RecentPosts posts={recentPosts} />
        </motion.div>
      )}
    </article>
  );
};

export default Home;
