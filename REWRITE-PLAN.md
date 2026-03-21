# Blog UI Rewrite: VitePress-Style Reader

**Branch**: `feature/vitepress-reader-rewrite`
**Target**: Transform the blog UI into a VitePress-inspired content-focused reader with draft review
**Keep**: React 19 + Vite + Tailwind v4 + Framer Motion + neon cyberpunk theme

---

## Why

The blog UI was originally built as a full CMS with admin console, media management, and auth. Phase 0 stripped all that out. Phase 1 added the AppShell layout and glass material system. Now the UI needs to become what it's actually for — a clean, fast, reading experience for LLM-generated homelab content, with a draft review flow for human-in-the-loop publishing.

VitePress is the inspiration: sidebar navigation by category/tag, table of contents per post, clean typography, search, and nothing else. But we keep React + Vite (not actual VitePress) and the neon cyberpunk aesthetic.

---

## What Exists (Phase 1)

These stay and get built on:

- **AppShell layout**: Fixed header + sidebar + main content area (Layout.tsx, Header.tsx, Sidebar.tsx)
- **Animated logo**: Per-character "PeteDio Labs" with Framer Motion gradient stagger
- **Glass material system**: `.glass-card`, `.glass-panel`, `.glass-modal` with backdrop-filter
- **Theme system**: `theme.css` CSS variables — single file color swap
- **Color palette**: Ice blue primary, electric rose secondary, true blue tertiary, near-white headings
- **Markdown rendering**: ReactMarkdown + remark-gfm + rehype-highlight + rehype-slug + rehype-autolink-headings
- **Custom neon tables**: MarkdownTable.tsx components
- **Framer Motion route transitions**: Fade + blur with reduced-motion respect
- **Tailwind v4**: @import based config, typography plugin

## What Gets Rewritten

### Pages

| Current | Rewrite To | Notes |
|---------|-----------|-------|
| Home.tsx (hero + featured + recent) | **Home.tsx** — latest posts feed + pinned/featured | Drop hero section, content-first like VitePress landing |
| BlogListPage.tsx (grid of all posts) | **PostsPage.tsx** — filterable post list by tag/status | Tag filter chips, simple list or compact cards |
| BlogPostPage.tsx (single post reader) | **PostPage.tsx** — full reader with sticky TOC sidebar | Right-side TOC (desktop), reading progress bar, estimated read time |
| SearchPage.tsx (debounced search) | **SearchPage.tsx** — keep but improve results display | Show excerpt highlights, tag matches |
| NotFound.tsx | Keep as-is | |
| *(new)* | **DraftsPage.tsx** — draft list (network-gated) | List blog-agent drafts, preview, approve/reject |
| *(new)* | **DraftReviewPage.tsx** — single draft review + edit + publish | Direct link from Discord notification, full preview + edit |
| *(new)* | **TagPage.tsx** — posts filtered by tag | `/tags/:tag` route, reuses post list |

### Sidebar

Current sidebar has placeholder nav items. Rewrite to VitePress-style navigation:

```
PeteDio Labs (logo)
─────────────────
🏠 Home
📝 All Posts
🏷️ Tags
  ├── homelab (4)
  ├── kubernetes (3)
  ├── llm (2)
  ├── infrastructure (2)
  └── meta (1)
🔍 Search
─────────────────
📋 Drafts (3)        ← blog-agent draft count
─────────────────
v1.0.0 · dev
```

- Tags section auto-populates from `/api/v1/info` (available tags)
- Draft count fetched from `/api/v1/admin/posts?status=DRAFT` (only visible on internal network — sidebar hides it if fetch fails/403)
- Active route highlighted
- Collapsible on mobile (existing toggle works)

### Post Reader (the core experience)

VitePress-style reading layout:

```
┌──────────┬───────────────────────────────────┬──────────┐
│          │                                   │          │
│ Sidebar  │         Post Content              │   TOC    │
│ (nav)    │                                   │ (sticky) │
│          │  Title                            │          │
│          │  Meta: date · 5 min read · tags   │ • Intro  │
│          │                                   │ • Setup  │
│          │  ## Intro                         │ • Config │
│          │  Lorem ipsum...                   │ • Result │
│          │                                   │          │
│          │  ## Setup                         │          │
│          │  ```bash                          │          │
│          │  kubectl apply -f ...             │          │
│          │  ```                              │          │
│          │                                   │          │
│          │  ← Previous  |  Next →            │          │
│          │                                   │          │
└──────────┴───────────────────────────────────┴──────────┘
```

Features:
- **Sticky right-side TOC** (desktop only, hidden on mobile) — auto-generated from headings, highlights current section via IntersectionObserver
- **Reading progress bar** — thin accent-colored bar at top of viewport
- **Estimated read time** — word count / 200 wpm
- **Previous/Next navigation** — links to adjacent posts by publish date
- **Copy button on code blocks** — click to copy code snippets
- **Tag badges** — clickable, link to `/tags/:tag`
- **Responsive**: TOC moves to collapsible accordion on mobile

### Draft Review Flow (Network-Gated)

Admin pages at `/admin/drafts` — only accessible on MetalLB IP (`192.168.50.241`). Nginx returns 403 when accessed through Cloudflare tunnel.

**How you get there**: Blog-agent creates a draft → publishes event to notification-service → Pete Bot picks up SSE event → DMs you on Discord with a direct link:

> Draft ready: "Weekly Recap: March 17–23"
> Review at: http://192.168.50.241/admin/drafts/42

**Draft list** (`/admin/drafts`):

```
┌─────────────────────────────────────────────────┐
│ Drafts (3 pending review)                        │
├─────────────────────────────────────────────────┤
│                                                  │
│ 📝 How the Blog Writes Itself                    │
│    blog-agent · 2 hours ago · deploy-changelog   │
│    [Review] [Publish] [Reject]                   │
│                                                  │
│ 📝 Weekly Recap: March 17–23                     │
│    blog-agent · 5 hours ago · weekly-recap       │
│    [Review] [Publish] [Reject]                   │
│                                                  │
└─────────────────────────────────────────────────┘
```

**Single draft review** (`/admin/drafts/:id`):

```
┌──────────┬──────────────────────────────────────┐
│          │                                      │
│ Sidebar  │  Draft: "Weekly Recap: March 17–23"  │
│          │  blog-agent · 5 hours ago            │
│          │                                      │
│          │  [Edit] [Publish] [Reject] [Unlisted]│
│          │                                      │
│          │  ─────────────────────────────────    │
│          │                                      │
│          │  ## This Week in the Homelab          │
│          │  Full markdown preview renders here   │
│          │  with the same PostReader component   │
│          │                                      │
└──────────┴──────────────────────────────────────┘
```

- **Review**: Full markdown preview using the same `PostReader` component as published posts
- **Edit**: Inline markdown editor — edit content/title/excerpt/tags before publishing
- **Publish**: `POST /api/v1/admin/posts/:id/publish` → sets PUBLISHED + publishedAt
- **Unlisted**: `PUT /api/v1/admin/posts/:id` with `status: UNLISTED` → shareable via direct link but not in feeds
- **Reject**: `DELETE /api/v1/admin/posts/:id` or set ARCHIVED
- **No auth** — network-gated at nginx, only reachable on local network

---

## API Integration Changes

### Updated Response Shape

The blog API rewrite uses a simpler pagination format:

```typescript
// Old (Spring Data Page)
interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  // ... 6 more fields
}

// New (simple)
interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}
```

### Updated BlogPost Type

```typescript
interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  status: 'DRAFT' | 'PUBLISHED' | 'UNLISTED' | 'ARCHIVED';
  source: 'seed' | 'blog-agent' | 'manual';
  isFeatured: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  tags: Tag[];
}

interface Tag {
  id: number;
  name: string;
  slug: string;
  postCount: number;
}
```

### Updated Service Layer

```typescript
// blogService.ts
getPosts(page?, size?): Promise<PaginatedResponse<BlogPost>>
getPostBySlug(slug): Promise<BlogPost>
searchPosts(query, page?, size?): Promise<PaginatedResponse<BlogPost>>
getPostsByTag(tag, page?, size?): Promise<PaginatedResponse<BlogPost>>
getInfo(): Promise<ApiInfo>

// adminService.ts (new — for draft review, network-gated at nginx)
getDrafts(page?, size?): Promise<PaginatedResponse<BlogPost>>
getDraft(id): Promise<BlogPost>
publishDraft(id): Promise<BlogPost>
rejectDraft(id): Promise<void>
updateDraft(id, updates): Promise<BlogPost>
```

---

## Route Map

```typescript
createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // Public routes (accessible via Cloudflare tunnel)
      { index: true, element: <Home /> },
      { path: 'posts', element: <PostsPage /> },
      { path: 'posts/:slug', element: <PostPage /> },
      { path: 'tags/:tag', element: <TagPage /> },
      { path: 'search', element: <SearchPage /> },

      // Admin routes (network-gated — MetalLB IP only, nginx blocks via Cloudflare)
      { path: 'admin/drafts', element: <DraftsPage /> },
      { path: 'admin/drafts/:id', element: <DraftReviewPage /> },

      { path: '*', element: <NotFound /> },
    ],
  },
]);
```

**URL changes:**
- `/blog` → `/posts` (cleaner, matches VitePress convention)
- `/blog/:slug` → `/posts/:slug`
- `/tags/:tag` (new)
- `/admin/drafts` (new, network-gated)
- `/admin/drafts/:id` (new, direct review link from Discord notification)

**Network gating:** Nginx returns 403 for `/admin/*` paths when the request comes through Cloudflare tunnel. Admin routes are only accessible on the MetalLB IP (`192.168.50.241`). Blog-agent sends draft review links via notification-service → Pete Bot DM with the internal URL.

---

## Project Structure

```
src/
├── main.tsx                    # React DOM mount
├── App.tsx                     # RouterProvider
├── router.tsx                  # Route definitions
├── index.css                   # Tailwind imports + glass materials + utilities
├── theme.css                   # CSS variable color system (unchanged)
├── components/
│   ├── layout/
│   │   ├── Layout.tsx          # AppShell (header + sidebar + main + TOC slot)
│   │   ├── Header.tsx          # Fixed header with animated logo (unchanged)
│   │   ├── Sidebar.tsx         # VitePress-style nav (tags, draft count)
│   │   └── ReadingProgress.tsx # Thin progress bar at viewport top
│   ├── post/
│   │   ├── PostCard.tsx        # Compact card for post lists
│   │   ├── PostList.tsx        # Filtered/paginated post grid
│   │   ├── PostReader.tsx      # Full markdown reader (prose + plugins)
│   │   ├── PostMeta.tsx        # Date, read time, tags, view count
│   │   ├── PostNav.tsx         # Previous/Next post links
│   │   ├── TableOfContents.tsx # Sticky right-side heading nav
│   │   └── CopyCodeButton.tsx  # Click-to-copy on code blocks
│   ├── admin/
│   │   ├── DraftList.tsx       # Draft cards with review/publish/reject actions
│   │   ├── DraftEditor.tsx     # Inline markdown editor for draft content
│   │   └── DraftActions.tsx    # Publish / Unlisted / Reject action bar
│   ├── search/
│   │   └── SearchResults.tsx   # Result cards with excerpt highlights
│   ├── markdown/
│   │   └── MarkdownTable.tsx   # Neon table components (unchanged)
│   └── common/
│       ├── Badge.tsx           # Tag + status badges
│       ├── Spinner.tsx         # Loading spinner
│       ├── ErrorMessage.tsx    # Error display
│       ├── Pagination.tsx      # Page controls (new)
│       └── TagChip.tsx         # Clickable tag filter chip (new)
├── pages/
│   ├── Home.tsx                # Latest posts feed + pinned
│   ├── PostsPage.tsx           # All posts with tag filters
│   ├── PostPage.tsx            # Single post reader + TOC
│   ├── TagPage.tsx             # Posts by tag
│   ├── SearchPage.tsx          # Search with highlights
│   ├── DraftsPage.tsx          # Draft list (network-gated)
│   ├── DraftReviewPage.tsx     # Single draft review + edit + publish (network-gated)
│   └── NotFound.tsx            # 404
├── hooks/
│   ├── usePosts.ts             # Fetch paginated posts
│   ├── usePost.ts              # Fetch single post by slug
│   ├── useDrafts.ts            # Fetch drafts for review
│   ├── useSearch.ts            # Debounced search
│   ├── useTags.ts              # Fetch tag list with counts
│   ├── useTableOfContents.ts   # Extract headings + IntersectionObserver
│   ├── useReadingProgress.ts   # Scroll progress percentage
│   ├── useDebounce.ts          # Generic debounce (unchanged)
│   └── useEnvironment.ts       # Env badge (unchanged)
├── services/
│   ├── api.ts                  # Fetch client (unchanged pattern)
│   ├── blogService.ts          # Public endpoints (updated response shape)
│   └── adminService.ts         # Draft review endpoints (new)
├── types/
│   └── index.ts                # BlogPost, Tag, PaginatedResponse, ApiInfo
└── utils/
    ├── dateFormatter.ts        # date-fns (unchanged)
    └── readTime.ts             # Word count → estimated minutes (new)
```

---

## Components to Remove

These exist from pre-Phase 0 or Phase 1 and are no longer needed:

- `components/blog/BlogCard.tsx` → replaced by `post/PostCard.tsx`
- `components/blog/BlogList.tsx` → replaced by `post/PostList.tsx`
- `components/blog/FeaturedPost.tsx` → simplified into Home.tsx
- `components/blog/RecentPosts.tsx` → absorbed into Home.tsx
- `components/common/Button.tsx` → only used by removed admin (evaluate if still needed)
- `components/common/Card.tsx` → replaced by glass-card CSS class directly
- `components/common/Modal.tsx` → replaced by DraftPreview if needed
- `components/common/ImageSkeleton.tsx` → no cover images in new design

---

## Dependencies

### Keep
- `react@19`, `react-dom@19`, `react-router@7`
- `framer-motion` — route transitions, logo animation
- `react-markdown`, `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`, `rehype-highlight`, `highlight.js`
- `lucide-react` — icons
- `date-fns` — date formatting
- `clsx` — className utility
- `tailwindcss@4`, `@tailwindcss/typography`

### Add
- None expected — everything needed is already installed

### Remove
- Nothing to remove — deps are already clean post-Phase 0

---

## Implementation Order

### Phase 1: Core Reader (the main experience)
- [ ] Update `types/index.ts` — new BlogPost, Tag, PaginatedResponse shapes
- [ ] Update `services/blogService.ts` — match new API pagination
- [ ] Rewrite `Sidebar.tsx` — VitePress-style nav with tags + draft count
- [ ] Build `PostReader.tsx` — markdown content with prose styling
- [ ] Build `TableOfContents.tsx` — sticky right-side, IntersectionObserver active heading
- [ ] Build `useTableOfContents.ts` — extract headings from content
- [ ] Build `PostMeta.tsx` — date, read time, tags, views
- [ ] Build `readTime.ts` — word count utility
- [ ] Build `PostCard.tsx` — compact card for lists
- [ ] Rewrite `PostPage.tsx` — reader + TOC + meta + nav
- [ ] Build `ReadingProgress.tsx` — scroll progress bar
- [ ] Build `useReadingProgress.ts` — scroll percentage hook
- [ ] Build `CopyCodeButton.tsx` — code block copy button
- [ ] Build `PostNav.tsx` — previous/next post links

### Phase 2: Pages + Navigation
- [ ] Rewrite `Home.tsx` — latest posts feed (drop hero)
- [ ] Build `PostsPage.tsx` — all posts with tag filter chips
- [ ] Build `TagPage.tsx` — posts filtered by tag
- [ ] Build `TagChip.tsx` — clickable filter chip
- [ ] Build `Pagination.tsx` — page controls
- [ ] Build `useTags.ts` — fetch tags with counts
- [ ] Update `router.tsx` — new routes (`/posts`, `/tags/:tag`, `/drafts`)
- [ ] Improve `SearchPage.tsx` — excerpt highlights in results
- [ ] Update `Layout.tsx` — TOC slot for post pages

### Phase 3: Admin / Draft Review (network-gated)
- [ ] Build `adminService.ts` — getDrafts, getDraft, publishDraft, updateDraft, rejectDraft
- [ ] Build `useDrafts.ts` — fetch + mutate drafts
- [ ] Build `DraftList.tsx` — draft cards with source badge + actions
- [ ] Build `DraftEditor.tsx` — inline markdown editor (textarea + live preview)
- [ ] Build `DraftActions.tsx` — Publish / Unlisted / Reject action bar
- [ ] Build `DraftsPage.tsx` — draft list page
- [ ] Build `DraftReviewPage.tsx` — single draft review (direct link from Discord DM)
- [ ] Add `/admin/*` routes to router
- [ ] Sidebar: show "Drafts (N)" only when admin API is reachable (hide on 403)

### Phase 4: Polish + Deploy
- [ ] Remove dead components (BlogCard, BlogList, FeaturedPost, RecentPosts, etc.)
- [ ] Verify Framer Motion transitions on new routes
- [ ] Mobile responsiveness pass (TOC → accordion, sidebar toggle)
- [ ] Update nginx.conf:
  - `/admin/*` → return 403 unless request is on internal network (not via CF tunnel)
  - Route paths updated for `/posts`, `/tags`, `/admin`
  - SPA catch-all for new routes
- [ ] Update Vite proxy config if API URL changed
- [ ] CI build verification
- [ ] Push, verify ArgoCD picks up new image
- [ ] Verify `/admin/drafts` accessible on `192.168.50.241`, blocked on `dev.petedillo.com`

---

## Design Principles

1. **Content-first**: Every pixel serves the reading experience. No decorative hero sections, no empty state illustrations. If there's no content, show "No posts yet."
2. **VitePress navigation**: Sidebar is for wayfinding (categories, tags), not for app chrome. TOC is per-page context.
3. **Glass material consistency**: All surfaces use glass-card/glass-panel. No solid backgrounds except the base `--theme-bg`.
4. **Neon accents, not neon overload**: Accent colors highlight interactive elements and headings. Body text stays neutral.
5. **Typography over decoration**: The reading experience lives in the prose — font size, line height, spacing, code blocks. Get these right and the rest follows.
6. **Draft review is lightweight**: Not a full CMS — just enough to preview and approve/reject blog-agent output.
