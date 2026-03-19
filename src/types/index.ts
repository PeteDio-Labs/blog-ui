export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: 'PUBLISHED' | 'DRAFT';
  tags: string[];
  authorName: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  coverImage?: {
    url: string;
    altText: string;
  };
}