import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Item } from '.';

vi.mock('./Item.module.css', () => ({
  default: {
    contentItem: 'contentItem',
    contentItemFocused: 'contentItemFocused',
    contentItemNormal: 'contentItemNormal',
  },
}));

describe('<Item />', () => {
  it('renders thumbnail always', () => {
    render(
      <Item
        artworkUrl="https://img.com/test.jpg"
        title="Item Title"
        isFocused={false}
        actualIndex={3}
        focusedIndex={5}
      />
    );
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('renders title only if focused', () => {
    render(
      <Item
        artworkUrl="https://img.com/test.jpg"
        title="Focused Title"
        isFocused={true}
        actualIndex={5}
        focusedIndex={5}
      />
    );
    expect(screen.getByText('Focused Title')).toBeInTheDocument();
  });

  it('does not render title if not focused', () => {
    render(
      <Item
        artworkUrl="https://img.com/test.jpg"
        title="Hidden Title"
        isFocused={false}
        actualIndex={1}
        focusedIndex={5}
      />
    );
    expect(screen.queryByText('Hidden Title')).not.toBeInTheDocument();
  });

  it('applies focused class when isFocused is true', () => {
    render(
      <Item
        artworkUrl="https://img.com/test.jpg"
        title="Focused CSS"
        isFocused={true}
        actualIndex={2}
        focusedIndex={2}
      />
    );
    const container = screen.getByTestId('item-wrapper');
    expect(container.className).toContain('contentItemFocused');
  });

  it('applies normal class when isFocused is false', () => {
    render(
      <Item
        artworkUrl="https://img.com/test.jpg"
        title="Normal CSS"
        isFocused={false}
        actualIndex={0}
        focusedIndex={2}
      />
    );

    const container = screen.getByTestId('item-wrapper');
    expect(container.className).toContain('contentItemNormal');
  });
});
