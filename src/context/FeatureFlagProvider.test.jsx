import React from 'react';
import { render, screen } from '@testing-library/react';
import { FeatureFlagProvider } from './FeatureFlagProvider';

describe('FeatureFlagProvider', () => {
  it('renders children correctly', () => {
    render(
      <FeatureFlagProvider>
        <div data-testid="child">Test Child</div>
      </FeatureFlagProvider>
    );

    const childElement = screen.getByTestId('child');
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Test Child');
  });
});
