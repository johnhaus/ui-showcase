import { useReducer, useCallback } from 'react';
import axios from 'axios';
import { reducer, initialState, actionTypes } from './postsReducer';

function usePostsExplorer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loading, error, page, hasMore, activeQuery } = state;

  const fetchPosts = useCallback(async () => {
    if (loading || !hasMore) return;

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
