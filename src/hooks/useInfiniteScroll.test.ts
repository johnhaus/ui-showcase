import React, { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
} from 'vitest';
import useInfiniteScroll, { type UseInfiniteScrollOptions } from './useInfiniteScroll';

(globalThis as typeof globalThis & {
  IS_REACT_ACT_ENVIRONMENT: boolean;
}).IS_REACT_ACT_ENVIRONMENT = true;

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  readonly callback: IntersectionObserverCallback;
  readonly options?: IntersectionObserverInit;

  observe = vi.fn<(target: Element) => void>();
  disconnect = vi.fn<() => void>();
  unobserve = vi.fn<(target: Element) => void>();
  takeRecords = vi.fn<() => IntersectionObserverEntry[]>(() => []);

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit,
  ) {
    this.callback = callback;
    this.options = options;

    MockIntersectionObserver.instances.push(this);
  }

  trigger(isIntersecting: boolean[]): void {
    const entries = isIntersecting.map(
      (isIntersecting) =>
        ({
          isIntersecting,
        }) as IntersectionObserverEntry,
    );

    this.callback(
      entries,
      this as unknown as IntersectionObserver,
    );
  }
}

type TestProps = UseInfiniteScrollOptions;

function TestComponent(props: TestProps) {
  const sentinelRef = useInfiniteScroll(props);

  return React.createElement('li', {
    ref: sentinelRef,
    'data-testid': 'sentinel',
  });
}

describe('useInfiniteScroll', () => {
  let container: HTMLDivElement;
  let root: Root | undefined;

  function renderTest(props: TestProps): void {
    if (!root) {
      throw new Error('React root has not been initialized');
    }

    act(() => {
      root!.render(React.createElement(TestComponent, props));
    });
  }

  function getObserver(index = 0): MockIntersectionObserver {
    const observer = MockIntersectionObserver.instances[index];

    if (!observer) {
      throw new Error(`Expected observer at index ${index}`);
    }

    return observer;
  }

  beforeEach(() => {
    MockIntersectionObserver.instances = [];

    vi.stubGlobal(
      'IntersectionObserver',
      MockIntersectionObserver,
    );

    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    if (root) {
      act(() => {
        root!.unmount();
      });

      root = undefined;
    }

    container.remove();
    vi.unstubAllGlobals();
  });

  it('calls onLoadMore when the sentinel intersects', () => {
    const onLoadMore = vi.fn();

    renderTest({
      hasMore: true,
      loading: false,
      onLoadMore,
    });

    const observer = getObserver();

    act(() => {
      observer.trigger([true]);
    });

    expect(onLoadMore).toHaveBeenCalledTimes(1);
    expect(observer.observe).toHaveBeenCalledTimes(1);
  });

  it('does not call onLoadMore while loading', () => {
    const onLoadMore = vi.fn();

    renderTest({
      hasMore: true,
      loading: true,
      onLoadMore,
    });

    act(() => {
      getObserver().trigger([true]);
    });

    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it('recreates the observer when onLoadMore changes', () => {
    const onLoadMore1 = vi.fn();
    const onLoadMore2 = vi.fn();

    renderTest({
      hasMore: true,
      loading: false,
      onLoadMore: onLoadMore1,
    });

    const firstObserver = getObserver();

    renderTest({
      hasMore: true,
      loading: false,
      onLoadMore: onLoadMore2,
    });

    expect(firstObserver.disconnect).toHaveBeenCalledTimes(1);
    expect(MockIntersectionObserver.instances).toHaveLength(2);
  });

  it('does not trigger onLoadMore multiple times while still intersecting', () => {
    const onLoadMore = vi.fn();

    renderTest({
      hasMore: true,
      loading: false,
      onLoadMore,
    });

    const observer = getObserver();

    act(() => {
      observer.trigger([true]);
      observer.trigger([true]);
      observer.trigger([true]);
    });

    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it('does not create an observer when hasMore is false', () => {
    renderTest({
      hasMore: false,
      loading: false,
      onLoadMore: vi.fn(),
    });

    expect(MockIntersectionObserver.instances).toHaveLength(0);
  });

  it('does not call onLoadMore when not intersecting', () => {
    const onLoadMore = vi.fn();

    renderTest({
      hasMore: true,
      loading: false,
      onLoadMore,
    });

    act(() => {
      getObserver().trigger([false]);
    });

    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it('allows another load after loading becomes false again', () => {
    const onLoadMore = vi.fn();

    renderTest({
      hasMore: true,
      loading: false,
      onLoadMore,
    });

    act(() => {
      getObserver().trigger([true]);
    });

    expect(onLoadMore).toHaveBeenCalledTimes(1);

    renderTest({
      hasMore: true,
      loading: true,
      onLoadMore,
    });

    renderTest({
      hasMore: true,
      loading: false,
      onLoadMore,
    });

    act(() => {
      getObserver(2).trigger([true]);
    });

    expect(onLoadMore).toHaveBeenCalledTimes(2);
  });

  it('uses the first intersection entry', () => {
    const onLoadMore = vi.fn();

    renderTest({
      hasMore: true,
      loading: false,
      onLoadMore,
    });

    act(() => {
      getObserver().trigger([false, true]);
    });

    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it('passes a custom rootMargin to IntersectionObserver', () => {
    renderTest({
      hasMore: true,
      loading: false,
      onLoadMore: vi.fn(),
      rootMargin: '200px',
    });

    expect(getObserver().options?.rootMargin).toBe('200px');
  });

  it('uses the default rootMargin when none is provided', () => {
    renderTest({
      hasMore: true,
      loading: false,
      onLoadMore: vi.fn(),
    });

    expect(getObserver().options?.rootMargin).toBe('100px');
  });

  it('recreates the observer when rootMargin changes', () => {
    const onLoadMore = vi.fn();

    renderTest({
      hasMore: true,
      loading: false,
      onLoadMore,
      rootMargin: '100px',
    });

    const firstObserver = getObserver();

    renderTest({
      hasMore: true,
      loading: false,
      onLoadMore,
      rootMargin: '200px',
    });

      expect(firstObserver.disconnect).toHaveBeenCalledTimes(1);
      expect(MockIntersectionObserver.instances).toHaveLength(2);
      expect(getObserver(1).options?.rootMargin).toBe('200px');
    });

  it('observes the sentinel element', () => {
    renderTest({
      hasMore: true,
      loading: false,
      onLoadMore: vi.fn(),
    });

    const sentinel = container.querySelector('[data-testid="sentinel"]');

    expect(getObserver().observe).toHaveBeenCalledTimes(1);
    expect(getObserver().observe).toHaveBeenCalledWith(sentinel);
  });

  it('disconnects the observer on unmount', () => {
    renderTest({
      hasMore: true,
      loading: false,
      onLoadMore: vi.fn(),
    });

    const observer = getObserver();

    act(() => {
      root!.unmount();
    });

    root = undefined;

    expect(observer.disconnect).toHaveBeenCalledTimes(1);
  });

  it('disconnects the observer when hasMore changes to false', () => {
    renderTest({
      hasMore: true,
      loading: false,
      onLoadMore: vi.fn(),
    });

    const firstObserver = getObserver();

    renderTest({
      hasMore: false,
      loading: false,
      onLoadMore: vi.fn(),
    });

    expect(firstObserver.disconnect).toHaveBeenCalledTimes(1);
    expect(MockIntersectionObserver.instances).toHaveLength(1);
  });

  it('creates an observer again when hasMore changes back to true', () => {
    const onLoadMore = vi.fn();

    renderTest({
      hasMore: true,
      loading: false,
      onLoadMore,
    });

    const firstObserver = getObserver();

    renderTest({
      hasMore: false,
      loading: false,
      onLoadMore,
    });

    renderTest({
      hasMore: true,
      loading: false,
      onLoadMore,
    });

    expect(firstObserver.disconnect).toHaveBeenCalledTimes(1);
    expect(MockIntersectionObserver.instances).toHaveLength(2);

    act(() => {
      getObserver(1).trigger([true]);
    });

    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });
});
