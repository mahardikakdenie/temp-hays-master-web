// src/types/api.types.ts
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type InternalAPI = {
  <T = never>(
    url: string,
    options?: { method?: HttpMethod; body?: never; params?: Record<string, never> },
  ): Promise<{
    status: number;
    json(): Promise<{ data: T; message?: string }>;
    text(): Promise<string>;
  }>;
};
