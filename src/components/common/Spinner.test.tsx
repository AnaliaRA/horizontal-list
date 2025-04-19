import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner', () => {
  it('renders the spinner container', () => {
    render(<Spinner />);
    const container = screen.getByRole('status');
    expect(container).toBeTruthy();
  });

  it('renders a child div inside the spinner', () => {
    render(<Spinner />);
    const container = screen.getByRole('status');
    const spinnerCircle = container.querySelector('div');
    expect(spinnerCircle).not.toBeNull();
  });

  it('spinner has animation and border styles applied via className', () => {
    render(<Spinner />);
    const container = screen.getByRole('status');
    const spinnerCircle = container.querySelector('div');
    expect(spinnerCircle?.className.includes('animate-spin')).toBe(true);
    expect(spinnerCircle?.className.includes('border-')).toBe(true);
  });
});
