export interface ImageColors {
  artwork_portrait: string | null;
  artwork_landscape: string | null;
  screenshot_portrait: string | null;
  screenshot_landscape: string | null;
}

export interface ImageInfo {
  id: number;
  locale: string;
  dominant_color: ImageColors;
  artwork_portrait: string | null;
  artwork_landscape: string | null;
  screenshot_portrait: string | null;
  screenshot_landscape: string | null;
  transparent_logo: string | null;
}

export interface ContentMetadata {
  id: number;
  type: string;
  original_title: string;
  year: number;
  duration_in_seconds: number | null;
}

export interface Content extends ContentMetadata {
  images: ImageInfo;
}

export interface PaginationInfo {
  count: number;
  current_page: number;
  next_page: number | null;
  per_page: number;
  prev_page: number | null;
  total_count: number;
  total_pages: number;
}

export interface ApiResponse {
  collection: Content[];
  pagination: PaginationInfo;
}

export interface StorePagination {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  perPage: number;
}

export interface ContentState {
  contents: Content[];
  focusedIndex: number;
  isLoading: boolean;
  isInitialLoading: boolean;
  error: string | null;
  pagination: StorePagination | null;
  fetchContents: (page?: number) => Promise<void>;
  setFocusedIndex: (index: number) => void;
  moveLeft: () => void;
  moveRight: () => void;
}
