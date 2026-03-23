import { describe, it, expect } from 'vitest';
import { reducer, initialState, actionTypes } from './postsReducer';

describe('postsReducer', () => {
  it('returns initial state for unknown action', () => {
    const state = reducer(initialState, { type: 'UNKNOWN' });
    expect(state).toEqual(initialState);
  });

  it('sets loading state', () => {
    const state = reducer(initialState, {
      type: actionTypes.SET_LOADING,
      payload: true,
    });

    expect(state.loading).toBe(true);
  });

  it('can turn loading off', () => {
    const state = reducer(
      { ...initialState, loading: true },
      { type: actionTypes.SET_LOADING, payload: false }
    );

    expect(state.loading).toBe(false);
  });

  it('does not mutate previous state', () => {
    const prevState = { ...initialState };

    const state = reducer(prevState, {
      type: actionTypes.SET_LOADING,
      payload: true,
    });

    expect(state).not.toBe(prevState);
  });

  it('sets error', () => {
    const state = reducer(initialState, {
      type: actionTypes.SET_ERROR,
      payload: 'Something went wrong',
    });

    expect(state.error).toBe('Something went wrong');
  });

  it('handles empty posts payload correctly', () => {
    const state = reducer(initialState, {
      type: actionTypes.SET_POSTS,
      payload: [],
    });

    expect(state.posts).toEqual([]);
    expect(state.page).toBe(2);
  });

  it('replaces posts when page is 1', () => {
    const state = reducer(initialState, {
      type: actionTypes.SET_POSTS,
      payload: [{ id: 1 }],
    });

    expect(state.posts).toEqual([{ id: 1 }]);
    expect(state.page).toBe(2);
  });

  it('appends posts when page > 1', () => {
    const prevState = {
      ...initialState,
      posts: [{ id: 1 }],
      page: 2,
    };

    const state = reducer(prevState, {
      type: actionTypes.SET_POSTS,
      payload: [{ id: 2 }],
    });

    expect(state.posts).toEqual([{ id: 1 }, { id: 2 }]);
    expect(state.page).toBe(3);
  });

  it('appends empty payload when page > 1 and still increments page', () => {
    const prevState = {
      ...initialState,
      posts: [{ id: 1 }],
      page: 2,
    };

    const state = reducer(prevState, {
      type: actionTypes.SET_POSTS,
      payload: [],
    });

    expect(state.posts).toEqual([{ id: 1 }]);
    expect(state.page).toBe(3);
  });

  it('handles multiple actions in sequence', () => {
    let state = initialState;

    state = reducer(state, {
      type: actionTypes.SET_SEARCH_INPUT,
      payload: 'react',
    });

    state = reducer(state, {
      type: actionTypes.SET_ACTIVE_QUERY,
      payload: 'react',
    });

    expect(state.activeQuery).toBe('react');
    expect(state.searchInput).toBe('react');
  });

  it('sets hasMore flag', () => {
    const state = reducer(initialState, {
      type: actionTypes.SET_HAS_MORE,
      payload: false,
    });

    expect(state.hasMore).toBe(false);
  });

  it('updates search input', () => {
    const state = reducer(initialState, {
      type: actionTypes.SET_SEARCH_INPUT,
      payload: 'react',
    });

    expect(state.searchInput).toBe('react');
  });

  it('resets state on SET_ACTIVE_QUERY', () => {
    const prevState = {
      ...initialState,
      posts: [{ id: 1 }],
      page: 5,
      hasMore: false,
      error: 'oops',
      activeQuery: '',
    };

    const state = reducer(prevState, {
      type: actionTypes.SET_ACTIVE_QUERY,
      payload: 'new query',
    });

    expect(state.activeQuery).toBe('new query');
    expect(state.page).toBe(1);
    expect(state.posts).toEqual([]);
    expect(state.hasMore).toBe(true);
    expect(state.error).toBe(null);
  });
});
