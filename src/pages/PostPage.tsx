import { useParams } from 'react-router';
import { useBlogPost } from '../hooks/useBlogPost';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { useTableOfContents } from '../hooks/useTableOfContents';
import PostReader from '../components/post/PostReader';
import PostMeta from '../components/post/PostMeta';
import PostNav from '../components/post/PostNav';
import TableOfContents from '../components/post/TableOfContents';
import ReadingProgress from '../components/post/ReadingProgress';
import Spinner from '../components/common/Spinner';
import ErrorMessage from '../components/common/ErrorMessage';

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { post, loading, error } = useBlogPost(slug);
  const { posts } = useBlogPosts(1, 100);
  const { items: tocItems, activeId } = useTableOfContents(post?.content ?? '');

  if (loading) return <Spinner />;
  if (error || !post) return <ErrorMessage message={error || 'Post not found.'} />;

  // Find previous/next by publish date
  const published = posts.filter((p) => p.status === 'PUBLISHED');
  const idx = published.findIndex((p) => p.slug === post.slug);
  const previous = idx > 0 ? published[idx - 1] : null;
  const next = idx >= 0 && idx < published.length - 1 ? published[idx + 1] : null;

  return (
    <>
      <ReadingProgress />
      <div className="max-w-6xl">
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_240px] gap-8">
          <article>
            <header className="mb-8">
              <h1 className="heading-neon-primary mb-4">{post.title}</h1>
              <PostMeta post={post} />
            </header>
            <PostReader content={post.content} />
            <PostNav previous={previous} next={next} />
          </article>

          {tocItems.length > 0 && (
            <aside className="hidden xl:block">
              <TableOfContents items={tocItems} activeId={activeId} />
            </aside>
          )}
        </div>
      </div>
    </>
  );
}
