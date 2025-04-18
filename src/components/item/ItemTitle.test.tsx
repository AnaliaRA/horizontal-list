import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ItemTitle } from './ItemTitle';

describe('<ItemTitle />', () => {
  it('renders the title', () => {
    render(<ItemTitle title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
});
