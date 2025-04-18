import { create } from 'zustand';
import type { Content, ContentState, StorePagination } from '@/types/contentTypes';
import { ContentApi } from '@/api/contentApi';
import { defaultApiConfig } from '@/api/config';
import type { TransformedResponse } from '@/api/types';

const contentApi = new ContentApi(defaultApiConfig);

const initialState: {
  contents: Content[];
  focusedIndex: number;
  isLoading: boolean;
  isInitialLoading: boolean;
  error: null | string;
  pagination: null | StorePagination;
} = {
  contents: [],
  focusedIndex: 0,
  isLoading: false,
  isInitialLoading: true,
  error: null,
  pagination: null,
};

export const useContentStore = create<ContentState>((set, get) => ({
  ...initialState,

  fetchContents: async (page = 1) => {
    const { isLoading, pagination } = get();
    if (isLoading) return;
    if (pagination?.totalPages && page > pagination.totalPages) return;

    set({
      isLoading: true,
      error: null,
      isInitialLoading: page === 1,
    });

    try {
      const response: TransformedResponse = await contentApi.fetchContents(page);
      const { contents, pagination: paginationData } = response;

      if (page === 1) {
        set({
          contents,
          pagination: paginationData,
          isInitialLoading: false,
        });
      } else {
        set(state => ({
          contents: [...state.contents, ...contents],
          pagination: paginationData,
          isInitialLoading: false,
        }));
      }
    } catch (error) {
      console.error('API Error:', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch contents',
        isLoading: false,
        isInitialLoading: false,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  setFocusedIndex: (index: number) => {
    set({ focusedIndex: index });
  },

  moveLeft: () => {
    const { focusedIndex } = get();
    if (focusedIndex > 0) {
      set({ focusedIndex: focusedIndex - 1 });
    }
  },

  moveRight: () => {
    const { focusedIndex, contents, pagination } = get();
    const nextIndex = focusedIndex + 1;

    const remainingItems = contents.length - nextIndex;
    const currentPage = pagination?.currentPage ?? 1;
    const totalPages = pagination?.totalPages ?? 1;
    const hasMorePages = currentPage < totalPages;

    if (hasMorePages && remainingItems < 15) {
      void get().fetchContents(currentPage + 1);
    }

    if (nextIndex < contents.length) {
      set({ focusedIndex: nextIndex });
    }
  },
}));
