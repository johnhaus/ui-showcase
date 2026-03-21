import { useReducer, useCallback } from 'react';
import axios from 'axios';

export const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_POSTS: 'SET_POSTS',
  SET_HAS_MORE: 'SET_HAS_MORE',
  SET_SEARCH_INPUT: 'SET_SEARCH_INPUT',
  SET_ACTIVE_QUERY: 'SET_ACTIVE_QUERY',
};

const initialState = {
  posts: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
  searchInput: '',
  activeQuery: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    case actionTypes.SET_POSTS:
      return {
        ...state,
        posts:
          state.page === 1
            ? action.payload
            : [...state.posts, ...action.payload],
        page: state.page + 1,
      };
    case actionTypes.SET_HAS_MORE:
      return { ...state, hasMore: action.payload };
    case actionTypes.SET_SEARCH_INPUT:
      return { ...state, searchInput: action.payload };
    case actionTypes.SET_ACTIVE_QUERY:
      return {
        ...state,
        activeQuery: action.payload,
        page: 1,
        posts: [],
        hasMore: true,
        error: null,
      };
    default:
      return state;
  }
};

function usePostsExplorer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loading, error, page, hasMore, activeQuery } = state;

  const fetchPosts = useCallback(async () => {
    if (loading || !hasMore || error) return;

    dispatch({ type: actionTypes.SET_LOADING, payload: true });

    try {
      const params = new URLSearchParams({
        _page: page,
        _limit: 20,
      });

      if (activeQuery) {
        params.append('q', activeQuery);
      }

      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?${params.toString()}`
      );

      if (response.data.length === 0) {
        dispatch({ type: actionTypes.SET_HAS_MORE, payload: false });
        return;
      }

      dispatch({ type: actionTypes.SET_POSTS, payload: response.data });
    } catch (err) {
      console.error('Failed to load posts:', err);

      dispatch({
        type: actionTypes.SET_ERROR,
        payload: 'Failed to load posts.',
      });
    } finally {
      dispatch({ type: actionTypes.SET_LOADING, payload: false });
    }
  }, [page, loading, hasMore, error, activeQuery]);

  return { state, dispatch, fetchPosts };
}

export default usePostsExplorer;
