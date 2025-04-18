import { beforeEach, describe, expect, it, vi, Mock, MockInstance } from 'vitest';
import { act } from 'react';
import { useContentStore } from './contentStore';
import { ContentApi } from '../api/contentApi';
import { defaultApiConfig } from '../api/config';

vi.mock('../api/contentApi', () => {
  const mockFetchContents = vi.fn().mockResolvedValue({
    contents: Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      title: `Content ${i + 1}`,
    })),
    pagination: {
      currentPage: 1,
      totalPages: 3,
    },
  });

  const mockGetConfig = vi.fn().mockReturnValue({
    baseUrl: 'http://test.com',
    market: 'US',
    device: 'web',
    locale: 'en-US',
    perPage: 30,
  });

  return {
    ContentApi: class {
      constructor() {}
      fetchContents = mockFetchContents;
      getConfig = mockGetConfig;
    },
    mockFetchContents,
  };
});

vi.mock('../api/config', () => ({
  defaultApiConfig: {
    baseUrl: 'http://test.com',
    market: 'US',
    device: 'web',
    locale: 'en-US',
    perPage: 30,
  },
}));

describe('useContentStore (without react-hooks lib)', () => {
  let fetchContentsMock: Mock;
  let consoleErrorSpy: MockInstance<(message?: unknown, ...optionalParams: unknown[]) => void>;

  beforeEach(() => {
    useContentStore.setState({
      contents: [],
      focusedIndex: 0,
      isLoading: false,
      isInitialLoading: true,
      error: null,
      pagination: null,
    });

    const mockInstance = new ContentApi(defaultApiConfig);
    fetchContentsMock = mockInstance.fetchContents as Mock;
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('fetches contents on page 1', async () => {
    await act(async () => {
      await useContentStore.getState().fetchContents(1);
    });

    const state = useContentStore.getState();
    expect(state.contents).toHaveLength(30);
    expect(state.pagination).toEqual({
      currentPage: 1,
      totalPages: 3,
    });
    expect(fetchContentsMock).toHaveBeenCalledWith(1);
  });

  it('handles API errors gracefully', async () => {
    fetchContentsMock.mockRejectedValueOnce(new Error('Boom'));

    await act(async () => {
      await useContentStore.getState().fetchContents(1);
    });

    const state = useContentStore.getState();
    expect(state.error).toBe('Boom');
    expect(state.isLoading).toBe(false);
  });

  it('updates focused index', () => {
    act(() => {
      useContentStore.getState().setFocusedIndex(2);
    });

    expect(useContentStore.getState().focusedIndex).toBe(2);
  });
});
