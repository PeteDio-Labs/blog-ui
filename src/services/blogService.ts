import api from './api';
import { type BlogPost, type Page } from '../types/index.ts';

export const blogService = {
  getPosts: async (): Promise<BlogPost[]> => {
    const data = await api.get<Page<BlogPost>>('/posts');
    return data.content;
  },
  searchPosts: async (query: string): Promise<BlogPost[]> => {
    const data = await api.get<Page<BlogPost>>('/search', { q: query });
    return data.content;
  },
  getPostBySlug: async (slug: string): Promise<BlogPost> => {
    return api.get<BlogPost>(`/posts/${slug}`);
  },
};
