import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router';
import { useBlogPost } from '../hooks/useBlogPost';
import Container from '../components/layout/Container';
import Spinner from '../components/common/Spinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { formatDate } from '../utils/dateFormatter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';
import {
  NeonTable,
  NeonTableHead,
  NeonTableBody,
  NeonTableRow,
  NeonTableHeader,
  NeonTableCell,
} from '../components/markdown/MarkdownTable';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { post, loading, error } = useBlogPost(slug);

  const [toc, setToc] = useState<Array<{ id: string; text: string; level: number }>>([]);

  const contentRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const nodes = node.querySelectorAll('h2[id]');
    const items: Array<{ id: string; text: string; level: number }> = [];
    nodes.forEach((el) => {
      const id = el.getAttribute('id') || '';
      const text = el.textContent || '';
      if (id && text) items.push({ id, text, level: 2 });
    });
    setToc(items);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error || !post) {
    return <ErrorMessage message={error || 'Post not found.'} />;
  }

  return (
    <Container className="py-12 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_260px] gap-8">
        <article>
        <header className="mb-8">
          <h1 className="heading-neon-primary mb-4">
            {post.title}
          </h1>
          <div className="text-neon-meta">
            <span>Published on {formatDate(post.publishedAt)}</span>
            {post.authorName && (
              <>
                <span className="mx-2">•</span>
                <span>By {post.authorName}</span>
              </>
            )}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="tag-neon">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        
        {/* Content */}
          <div
            ref={contentRef}
            className="prose prose-invert lg:prose-xl max-w-none prose-headings:text-neon-green prose-headings:scroll-mt-24 prose-p:text-neon-cyan prose-a:text-neon-blue prose-strong:text-neon-green prose-code:text-neon-cyan prose-pre:bg-overlay prose-pre:border prose-pre:border-neon-cyan/30 prose-li:text-neon-cyan prose-blockquote:text-neon-blue prose-blockquote:border-neon-cyan"
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[
                rehypeSlug,
                [
                  rehypeAutolinkHeadings,
                  {
                    behavior: 'append',
                    properties: { className: ['link-neon'] },
                  },
                ],
                rehypeHighlight,
              ]}
              components={{
                table: NeonTable,
                thead: NeonTableHead,
                tbody: NeonTableBody,
                tr: NeonTableRow,
                th: NeonTableHeader,
                td: NeonTableCell,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

        {/* Simple TOC (desktop) */}
        {toc.length > 0 && (
          <aside className="hidden xl:block">
            <div className="sticky top-24 border-l border-neon-cyan/30 pl-4 text-sm">
              <div className="text-lg font-bold text-neon-cyan mb-4">On this page</div>
              <nav>
                <ul className="space-y-2">
                  {toc.map((item) => (
                    <li key={item.id} className={item.level === 3 ? 'ml-3' : ''}>
                      <a
                        href={`#${item.id}`}
                        className="link-neon"
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById(item.id);
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>
        )}
      </div>
    </Container>
  );
};

export default BlogPostPage;