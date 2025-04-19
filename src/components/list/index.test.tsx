import React from 'react';
import { describe, it, expect, vi, beforeEach, MockInstance, MockedFunction } from 'vitest';
import { render, screen } from '@testing-library/react';
import { List } from './index';
import { useContentStore } from '../../store/contentStore';
import { useVisibleRange } from '../../hooks/useVisibleRange';
import { calculateLeadingSpacerWidth, calculateTrailingSpacerWidth } from '../../utils';
import { ListItem } from './ListItem';
import { Spacer } from '../../components/spacer/Spacer';

vi.mock('../../store/contentStore', () => ({
  useContentStore: vi.fn(),
}));

vi.mock('../../hooks/useVisibleRange', () => ({
  useVisibleRange: vi.fn(() => ({ start: 0, end: 10 })),
}));

vi.mock('../../hooks/useKeyboardNavigation', () => ({
  useKeyboardNavigation: vi.fn(),
}));

vi.mock('../../hooks/useContentFetching', () => ({
  useContentFetching: vi.fn(),
}));

vi.mock('../../hooks/useFocusManagement', () => ({
  useFocusManagement: vi.fn(() => ({ handleOnFocus: vi.fn() })),
}));

vi.mock('./ListItem', () => ({
  ListItem: vi.fn(() => <div data-testid="mocked-list-item">Mocked List Item</div>),
}));

vi.mock('../../components/common', () => ({
  LoadingState: vi.fn(() => <div data-testid="loading-state">Loading...</div>),
  ErrorState: vi.fn(() => <div data-testid="error-state">Error!</div>),
  EmptyState: vi.fn(() => <div data-testid="empty-state">No content</div>),
}));

vi.mock('../../components/spacer/Spacer', () => ({
  Spacer: vi.fn(({ width }) => (
    <div data-testid="spacer" data-width={width}>
      Spacer
    </div>
  )),
}));

vi.mock('../../utils', () => ({
  getContentId: vi.fn(() => 123),
  calculateLeadingSpacerWidth: vi.fn(() => 100),
  calculateTrailingSpacerWidth: vi.fn(() => 200),
}));

describe('List', () => {
  const mockContents = [
    {
      id: 123,
      type: 'movie',
      original_title: 'Test Movie 1',
      year: 2023,
      duration_in_seconds: 7200,
      images: {
        id: 456,
        locale: 'en-US',
        dominant_color: {
          artwork_portrait: '#123456',
          artwork_landscape: '#654321',
          screenshot_portrait: null,
          screenshot_landscape: null,
        },
        artwork_portrait: 'https://example.com/image1.jpg',
        artwork_landscape: 'https://example.com/landscape1.jpg',
        screenshot_portrait: null,
        screenshot_landscape: null,
        transparent_logo: null,
      },
    },
    {
      id: 124,
      type: 'movie',
      original_title: 'Test Movie 2',
      year: 2023,
      duration_in_seconds: 7200,
      images: {
        id: 457,
        locale: 'en-US',
        dominant_color: {
          artwork_portrait: '#123456',
          artwork_landscape: '#654321',
          screenshot_portrait: null,
          screenshot_landscape: null,
        },
        artwork_portrait: 'https://example.com/image2.jpg',
        artwork_landscape: 'https://example.com/landscape2.jpg',
        screenshot_portrait: null,
        screenshot_landscape: null,
        transparent_logo: null,
      },
    },
  ];

  const mockContentStoreDefault = {
    contents: mockContents,
    focusedIndex: 0,
    isLoading: false,
    error: null,
    fetchContents: vi.fn(),
    moveLeft: vi.fn(),
    moveRight: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useContentStore as unknown as MockInstance).mockReturnValue(mockContentStoreDefault);
  });

  it('should render loading state when loading and no contents', () => {
    (useContentStore as unknown as MockInstance).mockReturnValue({
      ...mockContentStoreDefault,
      isLoading: true,
      contents: [],
    });

    render(<List />);
    
    expect(screen.getByTestId('loading-state')).toBeInTheDocument();
    expect(screen.queryByTestId('list-container')).not.toBeInTheDocument();
  });

  it('should render error state when there is an error', () => {
    (useContentStore as unknown as MockInstance).mockReturnValue({
      ...mockContentStoreDefault,
      error: 'Something went wrong',
    });

    render(<List />);
    
    expect(screen.getByTestId('error-state')).toBeInTheDocument();
    expect(screen.queryByTestId('list-container')).not.toBeInTheDocument();
  });

  it('should render empty state when there are no contents', () => {
    (useContentStore as unknown as MockInstance).mockReturnValue({
      ...mockContentStoreDefault,
      contents: [],
    });

    render(<List />);
    
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    expect(screen.queryByTestId('list-container')).not.toBeInTheDocument();
  });

  it('should render the list container with content items', () => {
    render(<List />);
    
    expect(screen.getByTestId('list-container')).toBeInTheDocument();
    expect(screen.getAllByTestId('mocked-list-item').length).toBe(mockContents.length);
    expect(ListItem).toHaveBeenCalledTimes(mockContents.length);
  });

  it('should render leading spacer when visibleRange.start > 0', () => {
    (useVisibleRange as unknown as MockInstance).mockReturnValue({ start: 5, end: 15 });
    
    render(<List />);
    
    expect(Spacer).toHaveBeenCalled();
    const mockedSpacer = Spacer as MockedFunction<typeof Spacer>;
    const firstCallFirstArg = mockedSpacer.mock.calls[0][0];
    expect(firstCallFirstArg).toHaveProperty('width');
    expect(calculateLeadingSpacerWidth).toHaveBeenCalledWith(5);
  });

  it('should render trailing spacer when visibleRange.end < contents.length', () => {
    (useVisibleRange as unknown as MockInstance).mockReturnValue({ start: 0, end: 1 });
    
    render(<List />);
    
    expect(Spacer).toHaveBeenCalled();
    expect(calculateTrailingSpacerWidth).toHaveBeenCalledWith(1, mockContents.length);
  });

  it('should calculate translateX based on focused index', () => {
    (useContentStore as unknown as MockInstance).mockReturnValue({
      ...mockContentStoreDefault,
      focusedIndex: 3,
    });
    
    render(<List />);
    
    const listContainer = screen.getByTestId('list-container');
    
    expect(listContainer).toHaveAttribute('style', expect.stringContaining('--translate-x'));
  });
}); 