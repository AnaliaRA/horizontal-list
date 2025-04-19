import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders the empty state message', () => {
    render(<EmptyState />);

    const emptyStateMessage = screen.getByText('No content available');
    expect(emptyStateMessage).toBeInTheDocument();
  });

  it('applies the correct styles', () => {
    render(<EmptyState />);

    const emptyStateElement = screen.getByText('No content available');
    expect(emptyStateElement).toHaveClass('text-white');
    expect(emptyStateElement).toHaveClass('text-2xl');
  });
});
