import { useCallback, useEffect } from 'react';
import type { Content } from '@/types/contentTypes';

/**
 * Hook to handle focus management for list items
 * @param focusedIndex The index of the currently focused item
 * @param contents The array of content items
 * @param itemRefsMap Map of references to item DOM elements
 * @returns Object containing focus-related handlers
 */
export const useFocusManagement = (
  focusedIndex: number,
  contents: Content[] | null,
  itemRefsMap: React.MutableRefObject<Map<number, HTMLDivElement>>
) => {
  useEffect(() => {
    if (!contents?.length) return;

    const focusedElement = itemRefsMap.current.get(focusedIndex);
    if (focusedElement) {
      focusedElement.focus();
    }
  }, [focusedIndex, contents, itemRefsMap]);

  const handleOnFocus = useCallback(() => {
    const focusedElement = itemRefsMap.current.get(focusedIndex);
    if (focusedElement) {
      focusedElement.focus();
    }
  }, [focusedIndex, itemRefsMap]);

  return { handleOnFocus };
};
