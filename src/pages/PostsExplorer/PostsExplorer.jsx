import React, { useReducer, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { cardStyles } from '../../styles/cardStyles';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MenuBar = styled.div`
  display: flex;
  height: 80px;
  width: 90%;
  max-width: 600px;
  gap: 12px;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 180px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  font-size: 16px;

  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.black};
  }
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.red};
  color: ${({ theme }) => theme.colors.white};
  flex: 0;
  border: none;
  padding: 0 8px;
  border-radius: 5px;
  width: 100%;
  height: 44px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const PostContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 800px;
`;

const List = styled.ul`
  width: 90%;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  min-height: 40px;
  list-style-type: none;
  margin-bottom: 16px;

  ${cardStyles}
`;

const LastListItem = styled.div`
  display: flex;
  height: 40px;
  justify-content: center;
  align-items: center;

  ${cardStyles}
`;

const Title = styled.h3`
  margin: 8px;
`;

const Content = styled.div`
  margin: 8px;
`;

const ErrorMessage = styled.div`
  width: 380px;
`;

const initialState = {
  posts: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
  searchInput: '',
  activeQuery: '',
};

const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_POSTS: 'SET_POSTS',
  SET_PAGE: 'SET_PAGE',
  SET_HAS_MORE: 'SET_HAS_MORE',
  SET_SEARCH_INPUT: 'SET_SEARCH_INPUT',
  SET_ACTIVE_QUERY: 'SET_ACTIVE_QUERY',
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
      };
    case actionTypes.SET_PAGE:
      return { ...state, page: action.payload };
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

function PostsExplorer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { posts, loading, error, page, hasMore, searchInput, activeQuery } =
    state;

  const loadMoreRef = useRef(null);
  const observerRef = useRef(null);

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
      dispatch({ type: actionTypes.SET_PAGE, payload: page + 1 });
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

  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading) {
          fetchPosts();
        }
      },
      { root: null, rootMargin: '100px', threshold: 0 }
    );

    observerRef.current.observe(loadMoreRef.current);

    return () => observerRef.current?.disconnect();
  }, [fetchPosts, loading, hasMore]);

  const handleSearchChange = (e) => {
    dispatch({
      type: actionTypes.SET_SEARCH_INPUT,
      payload: e.target.value,
    });
  };

  const handleSearchSubmit = () => {
    dispatch({
      type: actionTypes.SET_ACTIVE_QUERY,
      payload: searchInput.trim(),
    });
  };

  const handleClearSearch = () => {
    dispatch({ type: actionTypes.SET_SEARCH_INPUT, payload: '' });
    dispatch({ type: actionTypes.SET_ACTIVE_QUERY, payload: '' });
  };

  return (
    <Container>
      <MenuBar>
        <SearchInput
          type="text"
          placeholder="Search posts..."
          value={searchInput}
          onChange={handleSearchChange}
        />
        <Button onClick={handleSearchSubmit}>Search</Button>
        <Button
          onClick={handleClearSearch}
          disabled={!searchInput && !activeQuery}
        >
          Clear
        </Button>
      </MenuBar>
      <h1>Posts Explorer</h1>

      <PostContainer>
        <List>
          {posts.map((post) => (
            <ListItem key={post.id}>
              <Title>{post.id}</Title>
              <Content>{post.body}</Content>
            </ListItem>
          ))}

          <li
            ref={loadMoreRef}
            style={{ height: 1, listStyle: 'none', margin: 0, padding: 0 }}
          />

          {loading && <div>Loading…</div>}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {!hasMore && posts.length > 0 && (
            <LastListItem>No more posts</LastListItem>
          )}
        </List>
      </PostContainer>
    </Container>
  );
}

export default PostsExplorer;
