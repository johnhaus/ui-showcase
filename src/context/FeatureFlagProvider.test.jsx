import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import { FeatureFlagProvider } from './FeatureFlagProvider';
import { FeatureFlagContext } from './FeatureFlagContext';
import defaultFlagsJson from '../config/featureFlags.json';

const TestConsumer = () => {
  const { flags } = useContext(FeatureFlagContext);
  return <div data-testid="flags">{JSON.stringify(flags)}</div>;
};

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

  it('provides default flags to consumers', () => {
    render(
      <FeatureFlagProvider>
        <TestConsumer />
      </FeatureFlagProvider>
    );

    expect(screen.getByTestId('flags')).toHaveTextContent(
      JSON.stringify(defaultFlagsJson)
    );
  });
});
