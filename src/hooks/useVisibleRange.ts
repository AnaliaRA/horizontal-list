import { useState, useEffect } from 'react';
import { VISIBLE_ITEMS, BUFFER_ITEMS, CENTERED_OFFSET } from '@/constants/listLayout';

type AnyRef<T> = React.RefObject<T> | React.MutableRefObject<T | null>;

interface UseVisibleRangeProps<T extends HTMLElement> {
  focusedIndex: number;
  totalItems: number;
  containerRef: AnyRef<T>;
}

interface VisibleRange {
  start: number;
  end: number;
}

/**
 * Calculate the initial visible range for the list
 *
 * @returns Initial visible range with start and end indices
 */
const getInitialVisibleRange = (): VisibleRange => {
  return {
    start: 0,
    end: VISIBLE_ITEMS + BUFFER_ITEMS,
  };
};

/**
 * Calculate the visible range based on the focused index and total items
 *
 * @param focusedIndex The currently focused index
 * @param totalItems The total number of items in the list
 * @returns Updated visible range with start and end indices
 */
const calculateVisibleRange = (focusedIndex: number, totalItems: number): VisibleRange => {
  const start = Math.max(0, focusedIndex - CENTERED_OFFSET);
  const bufferedStart = Math.max(0, start - BUFFER_ITEMS);
  const bufferedEnd = Math.min(totalItems, start + VISIBLE_ITEMS + BUFFER_ITEMS);

  return {
    start: bufferedStart,
    end: bufferedEnd,
  };
};

export function useVisibleRange<T extends HTMLElement = HTMLElement>({
  focusedIndex,
  totalItems,
  containerRef,
}: UseVisibleRangeProps<T>): VisibleRange {
  const [visibleRange, setVisibleRange] = useState<VisibleRange>(getInitialVisibleRange());

  useEffect(() => {
    if (!containerRef.current || !totalItems) return;

    setVisibleRange(calculateVisibleRange(focusedIndex, totalItems));
  }, [focusedIndex, totalItems, containerRef]);

  return visibleRange;
}
