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
  content: string;
  excerpt: string | null;
  status: PostStatus;
  source: PostSource;
  isFeatured: boolean;
  viewCount: number;
  coverImageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
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
