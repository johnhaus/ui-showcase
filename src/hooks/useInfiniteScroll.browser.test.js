globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import useInfiniteScroll from './useInfiniteScroll';

let observerCallback;
let observeMock;
let disconnectMock;
let observerOptions;

class MockIntersectionObserver {
  constructor(cb, options) {
    observerCallback = cb;
    observerOptions = options;
  }

  observe = (...args) => observeMock(...args);
  disconnect = (...args) => disconnectMock(...args);
  unobserve = vi.fn();
}

globalThis.IntersectionObserver = MockIntersectionObserver;

function TestComponent(props) {
  const sentinelRef = useInfiniteScroll(props);
  return React.createElement('div', {
    ref: sentinelRef,
    'data-testid': 'sentinel',
  });
}

describe('useInfiniteScroll', () => {
  let container;
  let root;

  function renderTest(props) {
    act(() => {
      root.render(React.createElement(TestComponent, props));
    });
  }

  beforeEach(() => {
    observerCallback = undefined;
    observerOptions = undefined;

    observeMock = vi.fn();
    disconnectMock = vi.fn();

    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    if (root) {
      act(() => root.unmount());
    }
    container?.remove();
  });

  it('calls onLoadMore when the sentinel intersects', () => {
    const onLoadMore = vi.fn();

    renderTest({
      hasMore: true,
      loading: false,
      onLoadMore,
    });

    expect(observerCallback).toBeDefined();

    act(() => {
      observerCallback([{ isIntersecting: true }]);
    });

    expect(onLoadMore).toHaveBeenCalledTimes(1);
    expect(observeMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onLoadMore while loading', () => {
    const onLoadMore = vi.fn();

    renderTest({
      hasMore: true,
      loading: true,
      onLoadMore,
    });

    expect(observerCallback).toBeDefined();

    act(() => {
      observerCallback([{ isIntersecting: true }]);
    });

    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it('recreates observer when onLoadMore changes', () => {
    const onLoadMore1 = vi.fn();
    const onLoadMore2 = vi.fn();

    renderTest({
      hasMore: true,
      loading: false,
      onLoadMore: onLoadMore1,
    });

    renderTest({
      hasMore: true,
      loading: false,
      onLoadMore: onLoadMore2,
    });

    expect(disconnectMock).toHaveBeenCalled();
  });

  it('does not trigger onLoadMore multiple times while still intersecting', () => {
    const onLoadMore = vi.fn();

    renderTest({
      hasMore: true,
      loading: false,
      onLoadMore,
    });

    expect(observerCallback).toBeDefined();

    act(() => {
      observerCallback([{ isIntersecting: true }]);
      observerCallback([{ isIntersecting: true }]);
      observerCallback([{ isIntersecting: true }]);
    });

    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it('does not create observer when hasMore is false', () => {
    const onLoadMore = vi.fn();

    renderTest({
      hasMore: false,
      loading: false,
      onLoadMore,
    });

    expect(observerCallback).toBeUndefined();
  });

  it('does not call onLoadMore when not intersecting', () => {
    const onLoadMore = vi.fn();

    renderTest({
      hasMore: true,
      loading: false,
      onLoadMore,
    });

    expect(observerCallback).toBeDefined();

    act(() => {
      observerCallback([{ isIntersecting: false }]);
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

    expect(observerCallback).toBeDefined();

    act(() => {
      observerCallback([{ isIntersecting: true }]);
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
      observerCallback([{ isIntersecting: true }]);
    });

    expect(onLoadMore).toHaveBeenCalledTimes(2);
  });

  it('ignores additional intersection entries beyond the first', () => {
    const onLoadMore = vi.fn();

    renderTest({
      hasMore: true,
      loading: false,
      onLoadMore,
    });

    expect(observerCallback).toBeDefined();

    act(() => {
      observerCallback([{ isIntersecting: false }, { isIntersecting: true }]);
    });

    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it('passes rootMargin to IntersectionObserver', () => {
    const onLoadMore = vi.fn();

    renderTest({
      hasMore: true,
      loading: false,
      onLoadMore,
      rootMargin: '200px',
    });

    expect(observerOptions.rootMargin).toBe('200px');
  });

  it('recreates observer when rootMargin changes', () => {
    const onLoadMore = vi.fn();

    renderTest({
      hasMore: true,
      loading: false,
      onLoadMore,
      rootMargin: '100px',
    });

    renderTest({
      hasMore: true,
      loading: false,
      onLoadMore,
      rootMargin: '200px',
    });

    expect(disconnectMock).toHaveBeenCalled();
  });

  it('observes the sentinel element', () => {
    const onLoadMore = vi.fn();

    renderTest({
      hasMore: true,
      loading: false,
      onLoadMore,
    });

    const sentinel = container.querySelector('[data-testid="sentinel"]');

    expect(observeMock).toHaveBeenCalledTimes(1);
    expect(observeMock).toHaveBeenCalledWith(sentinel);
  });

  it('disconnects the observer on unmount', () => {
    const onLoadMore = vi.fn();

    renderTest({
      hasMore: true,
      loading: false,
      onLoadMore,
    });

    act(() => {
      root.unmount();
    });

    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });
});
