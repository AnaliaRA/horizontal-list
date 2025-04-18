import { ItemThumbnail } from '@/components/item/ItemThumbnail';
import { ItemTitle } from '@/components/item/ItemTitle';
import type { ItemProps } from '@/types/componentProps';
import { PRIORITY_LOAD_THRESHOLD } from '@/constants/listLayout';
import styles from './Item.module.css';

export function Item({ artworkUrl, title, isFocused, actualIndex, focusedIndex }: ItemProps) {
  const getItemClass = () => {
    if (isFocused) return styles.contentItemFocused;
    if (Math.abs(actualIndex - focusedIndex) === 1) return styles.contentItemNear;
    return styles.contentItemNormal;
  };

  const isPriorityLoad = Math.abs(actualIndex - focusedIndex) <= PRIORITY_LOAD_THRESHOLD;

  return (
    <div className={getItemClass()} data-testid="item-wrapper">
      <ItemThumbnail
        artworkUrl={artworkUrl}
        title={title}
        isFocused={isFocused}
        loadingPriority={isPriorityLoad ? 'eager' : 'lazy'}
      />
      {isFocused && <ItemTitle title={title} />}
    </div>
  );
}
