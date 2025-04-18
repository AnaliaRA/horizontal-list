import type { ItemThumbnailProps } from '@/types/componentProps';
import styles from './ItemThumbnail.module.css';

export function ItemThumbnail({
  artworkUrl,
  title,
  isFocused,
  loadingPriority,
}: ItemThumbnailProps) {
  return (
    <div className={isFocused ? styles.imageContainerFocused : styles.imageContainerNormal}>
      {artworkUrl ? (
        <img
          src={artworkUrl}
          alt={title}
          className="w-full h-full object-cover"
          loading={loadingPriority}
          decoding="async"
        />
      ) : (
        <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white p-4 text-center">
          {title}
        </div>
      )}
    </div>
  );
}
