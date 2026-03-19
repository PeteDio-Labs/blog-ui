const API_BASE = '/api/v1';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export default {
  get: <T>(path: string, params?: Record<string, string>) => {
    const url = params ? `${path}?${new URLSearchParams(params)}` : path;
    return request<T>(url);
  },
};
