import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

vi.mock('./store/contentStore', () => ({
  useContentStore: vi.fn().mockReturnValue({
    contents: [
      {
        id: 1,
        type: 'movie',
        original_title: 'Test Movie',
        year: 2023,
        duration_in_seconds: 7200,
        images: {
          id: 101,
          locale: 'en',
          dominant_color: {
            artwork_portrait: '#000',
            artwork_landscape: '#000',
            screenshot_portrait: '#000',
            screenshot_landscape: '#000',
          },
          artwork_portrait: 'test.jpg',
          artwork_landscape: null,
          screenshot_portrait: null,
          screenshot_landscape: null,
          transparent_logo: null,
        },
      },
    ],
    focusedIndex: 0,
    isLoading: false,
    error: null,
    fetchContents: vi.fn(),
    moveLeft: vi.fn(),
    moveRight: vi.fn(),
  }),
}));

describe('<App />', () => {
  it('renders List inside layout container', () => {
    const { container } = render(<App />);
    const tvContainer = container.querySelector('.tv-container');

    expect(tvContainer).toBeTruthy();
    expect(container.querySelector('[data-testid="list-container"]')).toBeTruthy();
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
  });
});
