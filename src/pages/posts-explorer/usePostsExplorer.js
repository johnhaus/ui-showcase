import { useReducer, useCallback, useRef, useEffect } from 'react';
import axios from 'axios';
import { reducer, initialState, actionTypes } from './postsReducer';
import { fetchPostsApi } from './postsApi';

const usePostsExplorer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loading, page, hasMore, activeQuery } = state;
  const abortControllerRef = useRef(null);

  const fetchPosts = useCallback(async () => {
    if (loading || !hasMore) return;

    abortControllerRef.current?.abort();

    const controller = new AbortController();
    abortControllerRef.current = controller;

    dispatch({
      type: actionTypes.SET_LOADING,
      payload: true,
    });

    try {
      const posts = await fetchPostsApi({
        page,
        query: activeQuery,
        signal: controller.signal,
      });

      if (posts.length === 0) {
        dispatch({
          type: actionTypes.SET_HAS_MORE,
          payload: false,
        });

        return;
      }

      dispatch({
        type: actionTypes.SET_POSTS,
        payload: posts,
      });
    } catch (error) {
      if (axios.isCancel(error) || error.name === 'CanceledError') {
        return;
      }

      dispatch({
        type: actionTypes.SET_ERROR,
        payload: 'Failed to load posts.',
      });
    } finally {
      if (!controller.signal.aborted) {
        dispatch({
          type: actionTypes.SET_LOADING,
          payload: false,
        });
      }
    }
  }, [page, loading, hasMore, activeQuery]);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return {
    state,
    dispatch,
    fetchPosts,
  };
};

export default usePostsExplorer;
