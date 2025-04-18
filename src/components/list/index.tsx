import { useRef, useCallback } from 'react';
import { useContentStore } from '@/store/contentStore';
import { Spacer } from '@/components/spacer/Spacer';
import { useVisibleRange } from '@/hooks/useVisibleRange';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { useContentFetching } from '@/hooks/useContentFetching';
import { useFocusManagement } from '@/hooks/useFocusManagement';
import { ListItem } from '@/components/list/ListItem';
import { LoadingState, ErrorState, EmptyState } from '@/components/common';
import { getContentId, calculateLeadingSpacerWidth, calculateTrailingSpacerWidth } from '@/utils';
import styles from './List.module.css';

import { ITEM_WIDTH, INITIAL_OFFSET, SCALED_ITEM_EXTRA_SPACE } from '@/constants/listLayout';

export function List() {
  const { contents, focusedIndex, isLoading, error, fetchContents, moveLeft, moveRight } =
    useContentStore();

  const listRef = useRef<HTMLDivElement>(null);
  const itemRefsMap = useRef(new Map<number, HTMLDivElement>());
  const visibleRange = useVisibleRange<HTMLDivElement>({
    focusedIndex,
    totalItems: contents?.length || 0,
    containerRef: listRef,
  });

  useKeyboardNavigation(moveLeft, moveRight);

  useContentFetching(fetchContents);

  const setItemRef = useCallback((element: HTMLDivElement | null, actualIndex: number) => {
    if (element) {
      itemRefsMap.current.set(actualIndex, element);
    } else {
      itemRefsMap.current.delete(actualIndex);
    }
  }, []);

  const { handleOnFocus } = useFocusManagement(focusedIndex, contents, itemRefsMap);

  if (isLoading && !contents?.length && !error) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!contents?.length) {
    return <EmptyState />;
  }

  const visibleContents = contents.slice(visibleRange.start, visibleRange.end);
  const translateX = Math.max(0, focusedIndex * ITEM_WIDTH - INITIAL_OFFSET);

  return (
    <div
      ref={listRef}
      data-testid="list-container"
      className={styles.contentListContainer}
      style={
        {
          '--translate-x': `-${translateX}px`,
          '--content-padding': `${SCALED_ITEM_EXTRA_SPACE}px`,
        } as React.CSSProperties
      }
      tabIndex={0}
      onFocus={handleOnFocus}
    >
      <div className={styles.contentList}>
        {visibleRange.start > 0 && (
          <Spacer width={calculateLeadingSpacerWidth(visibleRange.start)} />
        )}

        {visibleContents.map((content, index) => (
          <ListItem
            key={getContentId(content)}
            content={content}
            index={index}
            visibleRangeStart={visibleRange.start}
            focusedIndex={focusedIndex}
            setItemRef={setItemRef}
          />
        ))}

        {visibleRange.end < (contents?.length || 0) && (
          <Spacer width={calculateTrailingSpacerWidth(visibleRange.end, contents.length)} />
        )}
      </div>
    </div>
  );
}

export { ListItem } from './ListItem';
