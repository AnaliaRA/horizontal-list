import type { Content, StorePagination } from '@/types/contentTypes';

export interface ApiConfig {
  baseUrl: string;
  market: string;
  device: string;
  locale: string;
  perPage: number;
}

export interface TransformedResponse {
  contents: Content[];
  pagination: StorePagination;
}

export interface IContentApi {
  fetchContents(page: number): Promise<TransformedResponse>;
  getConfig(): ApiConfig;
}

export interface AxiosErrorLike {
  isAxiosError?: boolean;
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}
