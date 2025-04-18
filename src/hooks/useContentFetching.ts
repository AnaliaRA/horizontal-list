import { useCallback, useEffect } from 'react';

const INITIAL_PAGE = 1;

/**
 * Hook to handle fetching content data
 * @param fetchContents Function to fetch content with specified page number
 */
export const useContentFetching = (fetchContents: (page: number) => void) => {
  const fetchData = useCallback(() => {
    void fetchContents(INITIAL_PAGE);
  }, [fetchContents]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
};
