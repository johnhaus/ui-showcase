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
  height: 40px;
  justify-content: center;
  align-items: center;
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

const Title = styled.h3`
  margin: 8px;
`;

const Content = styled.div`
  margin: 8px;
`;

const initialState = {
  posts: [],
  loading: false,
  error: null,
  page: 1,
};

const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_POSTS: 'SET_POSTS',
  SET_PAGE: 'SET_PAGE',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    case actionTypes.SET_POSTS:
      return { ...state, posts: [...state.posts, ...action.payload] };
    case actionTypes.SET_PAGE:
      return { ...state, page: action.payload };
    default:
      return state;
  }
};

function PostsExplorer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { posts, loading, error, page } = state;

  const loadMoreRef = useRef(null);
  const observerRef = useRef(null);


  const fetchPosts = useCallback(async () => {
    if (loading) return;

    dispatch({ type: actionTypes.SET_LOADING, payload: true });

    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=20`
      );

      if (response.data.length === 0) {
        observerRef.current?.disconnect();
        return;
      }

      dispatch({ type: actionTypes.SET_POSTS, payload: response.data });
      dispatch({ type: actionTypes.SET_PAGE, payload: page + 1 });
    } catch (err) {
      dispatch({ type: actionTypes.SET_ERROR, payload: 'Failed to fetch data' });
    } finally {
      dispatch({ type: actionTypes.SET_LOADING, payload: false });
    }
  }, [page, loading]);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading) {
          fetchPosts();
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0,
      }
    );

    observerRef.current.observe(loadMoreRef.current);

    return () => observerRef.current?.disconnect();
  }, [fetchPosts]);

  return (
    <Container>
      <MenuBar>Menu Bar</MenuBar>
      <h1>Posts Explorer</h1>

      <PostContainer>
        <List>
          {posts.map((post) => (
            <ListItem key={post.id}>
              <Title>{post.id}</Title>
              <Content>{post.body}</Content>
            </ListItem>
          ))}

          <li ref={loadMoreRef} style={{ height: 1 }} />

          {loading && <ListItem>Loading…</ListItem>}
          {error && <ListItem>{error}</ListItem>}
        </List>
      </PostContainer>
    </Container>
  );
}

export default PostsExplorer;
