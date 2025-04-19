import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingState } from './LoadingState';
import { Spinner } from './Spinner';

vi.mock('./Spinner', () => ({
  Spinner: vi.fn(() => <div data-testid="mocked-spinner">Loading...</div>)
}));

describe('LoadingState', () => {
  it('renders the Spinner component', () => {
    render(<LoadingState />);
    
    const spinner = screen.getByTestId('mocked-spinner');

    expect(spinner).toBeInTheDocument();
  });
  
  it('calls the Spinner component', () => {
    render(<LoadingState />);
    
    expect(Spinner).toHaveBeenCalled();
  });
  
}); 