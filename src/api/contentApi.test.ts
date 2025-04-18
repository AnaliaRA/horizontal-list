import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ContentApi } from './contentApi';
import { defaultApiConfig } from './config';
import type { ApiResponse } from '../types/contentTypes';

vi.mock('axios');

const mockedAxios = axios as unknown as {
  get: ReturnType<typeof vi.fn>;
};

const mockApiResponse: ApiResponse = {
  collection: [
    {
      id: 1,
      type: 'movie',
      original_title: 'Test Content',
      year: 2023,
      duration_in_seconds: 7200,
      images: {
        id: 101,
        locale: 'es',
        dominant_color: {
          artwork_portrait: '#000000',
          artwork_landscape: null,
          screenshot_portrait: null,
          screenshot_landscape: null,
        },
        artwork_portrait: 'portrait.jpg',
        artwork_landscape: null,
        screenshot_portrait: null,
        screenshot_landscape: null,
        transparent_logo: null,
      },
    },
  ],
  pagination: {
    count: 100,
    current_page: 1,
    next_page: 2,
    prev_page: null,
    total_pages: 2,
    total_count: 100,
    per_page: 50,
  },
};

describe('ContentApi', () => {
  let api: ContentApi;

  beforeEach(() => {
    api = new ContentApi(defaultApiConfig);
    vi.clearAllMocks();
  });

  it('returns transformed content on success', async () => {
    mockedAxios.get = vi.fn().mockResolvedValueOnce({ data: mockApiResponse });

    const result = await api.fetchContents(1);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${defaultApiConfig.baseUrl}/v1/genres/14/contents`,
      expect.objectContaining({
        params: expect.objectContaining({
          market: 'es',
          device: 'tv',
          locale: 'es',
          page: 1,
          per_page: 50,
        }),
      })
    );

    expect(result.contents[0].id).toBe(1);
    expect(result.contents[0].images.artwork_landscape).toBeNull();
    expect(result.pagination.totalCount).toBe(100);
  });

  it('throws error on invalid response format', async () => {
    mockedAxios.get = vi.fn().mockResolvedValueOnce({ data: { collection: null } });

    await expect(api.fetchContents(1)).rejects.toThrow('Invalid API response format');
  });

  it('throws Axios error with message', async () => {
    const mockAxiosError = new Error('Request failed with status code 401') as AxiosError;
    mockAxiosError.isAxiosError = true;
    mockAxiosError.response = {
      data: { message: 'Unauthorized' },
      status: 401,
      statusText: 'Unauthorized',
      headers: {},
      config: {} as AxiosRequestConfig,
    } as AxiosResponse;

    mockedAxios.get = vi.fn().mockRejectedValueOnce(mockAxiosError);

    await expect(api.fetchContents(1)).rejects.toThrow('Unauthorized');
  });

  it('throws general error if not AxiosError', async () => {
    mockedAxios.get = vi.fn().mockRejectedValueOnce(new Error('Something went wrong'));

    await expect(api.fetchContents(1)).rejects.toThrow('Something went wrong');
  });

  it('returns config correctly from getConfig()', () => {
    expect(api.getConfig()).toEqual(defaultApiConfig);
  });
});
