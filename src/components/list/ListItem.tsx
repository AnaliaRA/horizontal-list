import { Item } from '@/components/item';
import { getArtworkUrl, getContentTitle, getContentId } from '@/utils';
import type { ListItemProps } from '@/types/componentProps';

const FOCUSABLE_TABINDEX = 0;
const NON_FOCUSABLE_TABINDEX = -1;

/**
 * List item component that renders a content item in the horizontal list
 */
export const ListItem = ({
  content,
  index,
  visibleRangeStart,
  focusedIndex,
  setItemRef,
}: ListItemProps) => {
  const actualIndex = index + visibleRangeStart;
  const artworkUrl = getArtworkUrl(content);
  const isFocused = actualIndex === focusedIndex;

  return (
    <div
      key={getContentId(content)}
      ref={element => setItemRef(element, actualIndex)}
      data-testid="list-item"
      data-list-item
      data-item-index={index}
      tabIndex={isFocused ? FOCUSABLE_TABINDEX : NON_FOCUSABLE_TABINDEX}
    >
      <Item
        artworkUrl={artworkUrl}
        title={getContentTitle(content)}
        isFocused={isFocused}
        actualIndex={actualIndex}
        focusedIndex={focusedIndex}
      />
    </div>
  );
};
