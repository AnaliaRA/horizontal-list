import type { Content } from '@/types/contentTypes';

export interface ListProps {
  contents: Content[];
  focusedIndex: number;
  isLoading: boolean;
  error: string | null;
  onMoveLeft: () => void;
  onMoveRight: () => void;
}

export interface ItemProps {
  artworkUrl: string | null;
  title: string;
  isFocused: boolean;
  actualIndex: number;
  focusedIndex: number;
}

export interface ItemThumbnailProps {
  artworkUrl: string | null;
  title: string;
  isFocused: boolean;
  loadingPriority: 'eager' | 'lazy';
}

export interface ItemTitleProps {
  title: string;
}

export interface SpacerProps {
  width: number;
}

export interface ErrorStateProps {
  message: string;
}

export interface ListItemProps {
  content: Content;
  index: number;
  visibleRangeStart: number;
  focusedIndex: number;
  setItemRef: (element: HTMLDivElement | null, actualIndex: number) => void;
}
