import api from './api';
import type { BlogPost, PaginatedResponse, ApiInfo } from '../types';

export const blogService = {
  getPosts: (page = 1, size = 20) =>
    api.get<PaginatedResponse<BlogPost>>('/posts', {
      page: String(page),
      size: String(size),
    }),

  getPostBySlug: (slug: string) =>
    api.get<BlogPost>(`/posts/${slug}`),

  searchPosts: (query: string, page = 1, size = 20) =>
    api.get<PaginatedResponse<BlogPost>>('/search', {
      q: query,
      page: String(page),
      size: String(size),
    }),

  getPostsByTag: (tag: string, page = 1, size = 20) =>
    api.get<PaginatedResponse<BlogPost>>(`/posts/tag/${tag}`, {
      page: String(page),
      size: String(size),
    }),

  getInfo: () => api.get<ApiInfo>('/info'),
};
