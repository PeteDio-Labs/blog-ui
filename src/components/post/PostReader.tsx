import { useRef, useEffect, type ReactNode } from 'react';
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
} from '../markdown/MarkdownTable';
import CopyCodeButton from './CopyCodeButton';

interface PostReaderProps {
  content: string;
}

export default function PostReader({ content }: PostReaderProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Inject copy buttons on code blocks after render
  useEffect(() => {
    if (!contentRef.current) return;
    // We handle copy buttons via the component override below,
    // so no DOM manipulation needed here.
  }, [content]);

  return (
    <div
      ref={contentRef}
      className="prose prose-invert lg:prose-lg max-w-none prose-headings:scroll-mt-24 prose-p:text-text-primary prose-a:text-accent-tertiary prose-strong:text-text-primary prose-code:text-accent-tertiary prose-pre:bg-surface-dark prose-pre:border prose-pre:border-accent-tertiary/20 prose-li:text-text-primary prose-blockquote:text-accent-tertiary prose-blockquote:border-accent-primary"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'append', properties: { className: ['link-neon'] } }],
          rehypeHighlight,
        ]}
        components={{
          table: NeonTable,
          thead: NeonTableHead,
          tbody: NeonTableBody,
          tr: NeonTableRow,
          th: NeonTableHeader,
          td: NeonTableCell,
          pre: ({ children, ...props }) => {
            // Extract code text for copy button
            const codeText = extractText(children);
            return (
              <pre className="relative group" {...props}>
                {children}
                <CopyCodeButton code={codeText} />
              </pre>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

function extractText(node: ReactNode): string {
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (node && typeof node === 'object' && 'props' in node) {
    return extractText((node as { props: { children?: ReactNode } }).props.children);
  }
  return '';
}
