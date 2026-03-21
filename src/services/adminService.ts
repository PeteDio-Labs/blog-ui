import api from './api';
import type { BlogPost, PaginatedResponse } from '../types';

export const adminService = {
  getDrafts: (page = 1, size = 20) =>
    api.get<PaginatedResponse<BlogPost>>('/admin/posts', {
      status: 'DRAFT',
      page: String(page),
      size: String(size),
    }),

  getDraft: (id: number) =>
    api.get<BlogPost>(`/admin/posts/${id}`),

  publishDraft: (id: number) =>
    api.post<BlogPost>(`/admin/posts/${id}/publish`),

  updateDraft: (id: number, updates: Partial<Pick<BlogPost, 'title' | 'content' | 'excerpt' | 'status'>>) =>
    api.put<BlogPost>(`/admin/posts/${id}`, updates),

  rejectDraft: (id: number) =>
    api.del<void>(`/admin/posts/${id}`),
};
