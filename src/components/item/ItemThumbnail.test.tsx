import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ItemThumbnail } from './ItemThumbnail';

describe('<ItemThumbnail />', () => {
  it('renders image if artworkUrl is provided', () => {
    render(
      <ItemThumbnail
        artworkUrl="https://example.com/image.jpg"
        title="Example"
        isFocused={false}
        loadingPriority="lazy"
      />
    );
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(img).toHaveAttribute('alt', 'Example');
  });

  it('renders fallback title if no artworkUrl', () => {
    render(
      <ItemThumbnail
        artworkUrl={null}
        title="Fallback Title"
        isFocused={true}
        loadingPriority="eager"
      />
    );
    expect(screen.getByText('Fallback Title')).toBeInTheDocument();
  });
});
