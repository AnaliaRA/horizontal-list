import type { Content } from '@/types/contentTypes';

/**
 * Extracts the artwork URL from a content object
 * @param content The content object
 * @returns The artwork URL or null if not available
 */
export const getArtworkUrl = (content: Content): string | null => {
  return content.images?.artwork_portrait || null;
};

/**
 * Extracts the title from a content object
 * @param content The content object
 * @returns The title string
 */
export const getContentTitle = (content: Content): string => {
  return content.original_title || '';
};

/**
 * Extracts the content ID
 * @param content The content object
 * @returns The content ID
 */
export const getContentId = (content: Content): number => {
  return content.id;
};

/**
 * Content data utility functions
 * Add more extraction functions as needed here
 */
