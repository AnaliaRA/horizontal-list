import { useCallback, useEffect } from 'react';

/**
 * Hook to handle keyboard navigation with arrow keys
 * @param moveLeft Function to call when left arrow is pressed
 * @param moveRight Function to call when right arrow is pressed
 */
export const useKeyboardNavigation = (moveLeft: () => void, moveRight: () => void) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        moveLeft();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        moveRight();
      }
    },
    [moveLeft, moveRight]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};
