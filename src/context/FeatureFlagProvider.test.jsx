import React, { useContext } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FeatureFlagProvider } from './FeatureFlagProvider';
import { FeatureFlagContext } from './FeatureFlagContext';
import defaultFlagsJson from '../config/featureFlags.json';
import * as storage from '../utils/localStorage';

const STORAGE_KEY = 'featureFlags';
const TEST_FLAG = Object.keys(defaultFlagsJson)[0];

const TestConsumer = () => {
  const { flags, updateFlag, toggleFlag, resetFlags } =
    useContext(FeatureFlagContext);

  return (
    <div>
      <div data-testid="flags">{JSON.stringify(flags)}</div>

      <button
        data-testid="set-flag-true"
        onClick={() => updateFlag(TEST_FLAG, true)}
      >
        enable
      </button>

      <button
        data-testid="set-flag-false"
        onClick={() => updateFlag(TEST_FLAG, false)}
      >
        disable
      </button>

      <button data-testid="toggle-flag" onClick={() => toggleFlag(TEST_FLAG)}>
        toggle
      </button>

      <button data-testid="reset-flags" onClick={resetFlags}>
        reset
      </button>
    </div>
  );
};

describe('FeatureFlagProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('renders children correctly', () => {
    render(
      <FeatureFlagProvider>
        <div data-testid="child">Test Child</div>
      </FeatureFlagProvider>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toHaveTextContent('Test Child');
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

  it('hydrates flags from localStorage overrides', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        [TEST_FLAG]: false,
      })
    );

    render(
      <FeatureFlagProvider>
        <TestConsumer />
      </FeatureFlagProvider>
    );

    expect(screen.getByTestId('flags')).toHaveTextContent(
      JSON.stringify({
        ...defaultFlagsJson,
        [TEST_FLAG]: false,
      })
    );
  });

  it('updates a flag', () => {
    render(
      <FeatureFlagProvider>
        <TestConsumer />
      </FeatureFlagProvider>
    );

    fireEvent.click(screen.getByTestId('set-flag-false'));

    expect(screen.getByTestId('flags')).toHaveTextContent(
      JSON.stringify({
        ...defaultFlagsJson,
        [TEST_FLAG]: false,
      })
    );

    fireEvent.click(screen.getByTestId('set-flag-true'));

    expect(screen.getByTestId('flags')).toHaveTextContent(
      JSON.stringify({
        ...defaultFlagsJson,
        [TEST_FLAG]: true,
      })
    );
  });

  it('toggles a flag', () => {
    render(
      <FeatureFlagProvider>
        <TestConsumer />
      </FeatureFlagProvider>
    );

    fireEvent.click(screen.getByTestId('toggle-flag'));

    expect(screen.getByTestId('flags')).toHaveTextContent(
      JSON.stringify({
        ...defaultFlagsJson,
        [TEST_FLAG]: !defaultFlagsJson[TEST_FLAG],
      })
    );
  });

  it('resets flags back to defaults', () => {
    render(
      <FeatureFlagProvider>
        <TestConsumer />
      </FeatureFlagProvider>
    );

    fireEvent.click(screen.getByTestId('toggle-flag'));

    expect(screen.getByTestId('flags')).toHaveTextContent(
      JSON.stringify({
        ...defaultFlagsJson,
        [TEST_FLAG]: !defaultFlagsJson[TEST_FLAG],
      })
    );

    fireEvent.click(screen.getByTestId('reset-flags'));

    expect(screen.getByTestId('flags')).toHaveTextContent(
      JSON.stringify(defaultFlagsJson)
    );
  });

  it('persists overrides to localStorage', async () => {
    const setItemSpy = vi.spyOn(storage, 'setItem');

    render(
      <FeatureFlagProvider>
        <TestConsumer />
      </FeatureFlagProvider>
    );

    fireEvent.click(screen.getByTestId('toggle-flag'));

    await waitFor(() => {
      expect(setItemSpy).toHaveBeenCalledWith(STORAGE_KEY, {
        [TEST_FLAG]: !defaultFlagsJson[TEST_FLAG],
      });
    });
  });

  it('removes localStorage entry when flags reset to defaults', async () => {
    const removeItemSpy = vi.spyOn(storage, 'removeItem');

    render(
      <FeatureFlagProvider>
        <TestConsumer />
      </FeatureFlagProvider>
    );

    fireEvent.click(screen.getByTestId('toggle-flag'));

    expect(screen.getByTestId('flags')).toHaveTextContent(
      JSON.stringify({
        ...defaultFlagsJson,
        [TEST_FLAG]: !defaultFlagsJson[TEST_FLAG],
      })
    );

    fireEvent.click(screen.getByTestId('reset-flags'));

    await waitFor(() => {
      expect(removeItemSpy).toHaveBeenCalledWith(STORAGE_KEY);
    });
  });

  it('syncs flags across tabs via storage events', async () => {
    render(
      <FeatureFlagProvider>
        <TestConsumer />
      </FeatureFlagProvider>
    );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        [TEST_FLAG]: false,
      })
    );

    window.dispatchEvent(
      new StorageEvent('storage', {
        key: STORAGE_KEY,
      })
    );

    await waitFor(() => {
      expect(screen.getByTestId('flags')).toHaveTextContent(
        JSON.stringify({
          ...defaultFlagsJson,
          [TEST_FLAG]: false,
        })
      );
    });
  });

  it('warns when updating an unknown flag', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const InvalidConsumer = () => {
      const { updateFlag } = useContext(FeatureFlagContext);

      return (
        <button
          data-testid="invalid-update"
          onClick={() => updateFlag('invalidFlag', true)}
        >
          invalid
        </button>
      );
    };

    render(
      <FeatureFlagProvider>
        <InvalidConsumer />
      </FeatureFlagProvider>
    );

    fireEvent.click(screen.getByTestId('invalid-update'));

    expect(warnSpy).toHaveBeenCalledWith('Unknown feature flag: invalidFlag');
  });

  it('warns when toggling an unknown flag', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const InvalidConsumer = () => {
      const { toggleFlag } = useContext(FeatureFlagContext);

      return (
        <button
          data-testid="invalid-toggle"
          onClick={() => toggleFlag('invalidFlag')}
        >
          invalid
        </button>
      );
    };

    render(
      <FeatureFlagProvider>
        <InvalidConsumer />
      </FeatureFlagProvider>
    );

    fireEvent.click(screen.getByTestId('invalid-toggle'));

    expect(warnSpy).toHaveBeenCalledWith('Unknown feature flag: invalidFlag');
  });
});
