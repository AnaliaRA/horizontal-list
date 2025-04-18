import type { ErrorStateProps } from '@/types/componentProps';

/**
 * Error state component shown when content loading fails
 */
export const ErrorState = ({ message }: ErrorStateProps) => (
  <div data-testid="error-message" className="text-red-500 text-center p-4">
    Error loading content: {message}
  </div>
);
