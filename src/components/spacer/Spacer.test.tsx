import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Spacer } from './Spacer';

describe('<Spacer />', () => {
  it('renders without crashing', () => {
    const { container } = render(<Spacer width={50} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('applies the correct --spacer-width style', () => {
    const { container } = render(<Spacer width={75} />);
    const spacerDiv = container.firstChild as HTMLDivElement;
    expect(spacerDiv.style.getPropertyValue('--spacer-width')).toBe('75px');
  });
});
