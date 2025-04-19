import React from 'react';
import { describe, it, expect, vi, beforeEach, MockedFunction } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ListItem } from './ListItem';
import * as utils from '../../utils';
import { Item } from '../../components/item';

vi.mock('../../components/item', () => ({
  Item: vi.fn(() => <div data-testid="mocked-item">Mocked Item Component</div>),
}));

vi.mock('../../utils', () => ({
  getArtworkUrl: vi.fn(() => 'mocked-artwork-url'),
  getContentTitle: vi.fn(() => 'Mocked Title'),
  getContentId: vi.fn(() => 123),
}));

describe('ListItem', () => {
  const mockContent = {
    id: 123,
    type: 'movie',
    original_title: 'Test Movie',
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
      artwork_portrait: 'https://example.com/image.jpg',
      artwork_landscape: 'https://example.com/landscape.jpg',
      screenshot_portrait: null,
      screenshot_landscape: null,
      transparent_logo: null,
    },
  };

  const mockSetItemRef = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly', () => {
    render(
      <ListItem
        content={mockContent}
        index={0}
        visibleRangeStart={0}
        focusedIndex={0}
        setItemRef={mockSetItemRef}
      />
    );

    expect(screen.getByTestId('list-item')).toBeInTheDocument();
    expect(screen.getByTestId('mocked-item')).toBeInTheDocument();
  });

  it('should call utility functions with the content', () => {
    render(
      <ListItem
        content={mockContent}
        index={0}
        visibleRangeStart={0}
        focusedIndex={0}
        setItemRef={mockSetItemRef}
      />
    );

    expect(utils.getArtworkUrl).toHaveBeenCalledWith(mockContent);
    expect(utils.getContentTitle).toHaveBeenCalledWith(mockContent);
    expect(utils.getContentId).toHaveBeenCalledWith(mockContent);
  });

  it('should calculate the actual index correctly', () => {
    const index = 2;
    const visibleRangeStart = 5;
    const expectedActualIndex = index + visibleRangeStart;

    render(
      <ListItem
        content={mockContent}
        index={index}
        visibleRangeStart={visibleRangeStart}
        focusedIndex={0}
        setItemRef={mockSetItemRef}
      />
    );

    const listItem = screen.getByTestId('list-item');
    expect(listItem.getAttribute('data-item-index')).toBe(index.toString());

    expect(mockSetItemRef).toHaveBeenCalledWith(expect.anything(), expectedActualIndex);
  });

  it('should set tabIndex to 0 when item is focused', () => {
    const index = 2;
    const visibleRangeStart = 5;
    const focusedIndex = index + visibleRangeStart;

    render(
      <ListItem
        content={mockContent}
        index={index}
        visibleRangeStart={visibleRangeStart}
        focusedIndex={focusedIndex}
        setItemRef={mockSetItemRef}
      />
    );

    const listItem = screen.getByTestId('list-item');
    expect(listItem).toHaveAttribute('tabIndex', '0');
  });

  it('should set tabIndex to -1 when item is not focused', () => {
    const index = 2;
    const visibleRangeStart = 5;
    const focusedIndex = index + visibleRangeStart + 1;

    render(
      <ListItem
        content={mockContent}
        index={index}
        visibleRangeStart={visibleRangeStart}
        focusedIndex={focusedIndex}
        setItemRef={mockSetItemRef}
      />
    );

    const listItem = screen.getByTestId('list-item');
    expect(listItem).toHaveAttribute('tabIndex', '-1');
  });

  it('should pass the correct props to the Item component', () => {
    const index = 2;
    const visibleRangeStart = 5;
    const focusedIndex = 7;
    const isFocused = index + visibleRangeStart === focusedIndex;

    render(
      <ListItem
        content={mockContent}
        index={index}
        visibleRangeStart={visibleRangeStart}
        focusedIndex={focusedIndex}
        setItemRef={mockSetItemRef}
      />
    );

    expect(Item).toHaveBeenCalled();
    const mockedItem = Item as MockedFunction<typeof Item>;
    const firstCallFirstArg = mockedItem.mock.calls[0][0];
    expect(firstCallFirstArg).toEqual({
      artworkUrl: 'mocked-artwork-url',
      title: 'Mocked Title',
      isFocused,
      actualIndex: index + visibleRangeStart,
      focusedIndex,
    });
  });
});
