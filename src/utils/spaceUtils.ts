import { ITEM_WIDTH } from '@/constants/listLayout';

/**
 * Calculates the width needed for a leading spacer
 * This spacer represents items that are before the visible range
 *
 * @param startIndex The starting index of the visible range
 * @returns Width in pixels
 */
export const calculateLeadingSpacerWidth = (startIndex: number): number => {
  return startIndex * ITEM_WIDTH;
};

/**
 * Calculates the width needed for a trailing spacer
 * This spacer represents items that are after the visible range
 *
 * @param endIndex The ending index of the visible range
 * @param totalItems The total number of items in the list
 * @returns Width in pixels
 */
export const calculateTrailingSpacerWidth = (endIndex: number, totalItems: number): number => {
  const remainingItems = totalItems - endIndex;
  return remainingItems * ITEM_WIDTH;
};
