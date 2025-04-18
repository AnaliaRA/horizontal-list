import type { ApiResponse, Content, StorePagination } from '@/types/contentTypes';

export class ContentTransformer {
  static transform(response: ApiResponse): { contents: Content[]; pagination: StorePagination } {
    const transformed = {
      contents: this.transformContents(response.collection),
      pagination: this.transformPagination(response.pagination),
    };
    return transformed;
  }

  private static transformContents(contents: Content[]): Content[] {
    return contents.map(content => ({
      ...content,
      images: {
        ...content.images,
        artwork_portrait: content.images.artwork_portrait || null,
        artwork_landscape: content.images.artwork_landscape || null,
        screenshot_portrait: content.images.screenshot_portrait || null,
        screenshot_landscape: content.images.screenshot_landscape || null,
        transparent_logo: content.images.transparent_logo || null,
      },
    }));
  }

  private static transformPagination(pagination: ApiResponse['pagination']): StorePagination {
    return {
      currentPage: pagination.current_page,
      totalPages: pagination.total_pages,
      totalCount: pagination.total_count,
      perPage: pagination.per_page,
    };
  }
}
