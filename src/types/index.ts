export interface Tag {
  id: number;
  name: string;
  slug: string;
  postCount: number;
}

export type PostStatus = 'DRAFT' | 'PUBLISHED' | 'UNLISTED' | 'ARCHIVED';
export type PostSource = 'seed' | 'blog-agent' | 'manual';

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  // `content` is only populated on single-post responses (/posts/:slug,
  // /admin/posts/:id). List endpoints omit it to keep payloads small —
  // they return a precomputed `readTimeMinutes` instead.
  content?: string;
  excerpt: string | null;
  status: PostStatus;
  source: PostSource;
  isFeatured: boolean;
  viewCount: number;
  coverImageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  readTimeMinutes?: number;
  tags: Tag[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

export interface ApiInfo {
  environment: string;
  version: string;
  tags: Tag[];
}
