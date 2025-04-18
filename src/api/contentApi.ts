import axios from 'axios';
import type { ApiResponse } from '@/types/contentTypes';
import type { ApiConfig, IContentApi, AxiosErrorLike, TransformedResponse } from '@/api/types';
import { ContentTransformer } from '@/api/contentTransformer';

export class ContentApi implements IContentApi {
  private readonly config: ApiConfig;

  constructor(config: ApiConfig) {
    this.config = config;
  }

  async fetchContents(page: number): Promise<TransformedResponse> {
    try {
      const response = await axios.get<ApiResponse>(
        `${this.config.baseUrl}/v1/genres/14/contents`,
        {
          params: {
            market: this.config.market,
            device: this.config.device,
            locale: this.config.locale,
            page,
            per_page: this.config.perPage,
          },
        }
      );

      if (!response.data || !response.data.collection) {
        throw new Error('Invalid API response format');
      }

      return ContentTransformer.transform(response.data);
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'isAxiosError' in error) {
        const axiosError = error as AxiosErrorLike;
        const errorMessage =
          axiosError.response?.data?.message || axiosError.message || 'Unknown error';
        throw new Error(errorMessage);
      }
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unknown error occurred');
    }
  }

  getConfig(): ApiConfig {
    return this.config;
  }
}
