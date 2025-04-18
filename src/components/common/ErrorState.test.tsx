import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorState } from './ErrorState';

describe('ErrorState', () => {
  const mockErrorMessage = 'Something went wrong';

  it('renders the error container', () => {
    render(<ErrorState message={mockErrorMessage} />);
    
    const errorContainer = screen.getByTestId('error-message');
    expect(errorContainer).toBeInTheDocument();
  });
  
  it('displays the provided error message', () => {
    render(<ErrorState message={mockErrorMessage} />);
    
    const errorMessage = screen.getByText(/Something went wrong/i);
    expect(errorMessage).toBeInTheDocument();
    
    const fullTextContent = screen.getByTestId('error-message').textContent;
    expect(fullTextContent).toContain('Error loading content: Something went wrong');
  });
  
  it('applies the correct styles to the error message', () => {
    render(<ErrorState message={mockErrorMessage} />);
    
    const errorContainer = screen.getByTestId('error-message');
    expect(errorContainer).toHaveClass('text-red-500');
    expect(errorContainer).toHaveClass('text-center');
    expect(errorContainer).toHaveClass('p-4');
  });
}); 