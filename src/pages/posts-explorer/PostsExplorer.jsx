import React from 'react';
import styled from 'styled-components';
import { cardStyles } from '../../styles/cardStyles';
import Button from '../../shared/button/Button';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import usePostsExplorer from './usePostsExplorer';
import { actionTypes } from './postsReducer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchBar = styled.div`
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
  border: 1px solid ${({ theme }) => theme.colors.border.subtle};
  font-size: 16px;

  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.border.inverseStrong};
  }
`;

const PostContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 800px;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
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

const LastListItem = styled.li`
  display: flex;
  height: 40px;
  list-style-type: none;
  justify-content: center;
  align-items: center;

  ${cardStyles}
`;

const Sentinel = styled.li`
  height: 1px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Title = styled.h3`
  margin: 8px;
`;

const Content = styled.div`
  margin: 8px;
`;

function PostsExplorer() {
  const { state, dispatch, fetchPosts } = usePostsExplorer();
  const { posts, loading, error, hasMore, searchInput, activeQuery } = state;

  const loadMoreRef = useInfiniteScroll({
    hasMore,
    loading,
    onLoadMore: fetchPosts,
  });

  const handleSearchChange = (e) => {
    dispatch({
      type: actionTypes.SET_SEARCH_INPUT,
      payload: e.target.value,
    });
  };

  const handleSearchSubmit = () => {
    const query = searchInput.trim();
    if (query === activeQuery) return;

    dispatch({
      type: actionTypes.SET_ACTIVE_QUERY,
      payload: query,
    });
  };

  const handleClearSearch = () => {
    if (searchInput) {
      dispatch({ type: actionTypes.SET_SEARCH_INPUT, payload: '' });
    }

    if (activeQuery) {
      dispatch({ type: actionTypes.SET_ACTIVE_QUERY, payload: '' });
    }
  };

  const handleRetry = () => {
    dispatch({ type: actionTypes.SET_ERROR, payload: null });
    fetchPosts();
  };

  return (
    <Container>
      <SearchBar
        as="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearchSubmit();
        }}
      >
        <SearchInput
          type="text"
          placeholder="Search posts..."
          value={searchInput}
          onChange={handleSearchChange}
          aria-label="Search posts"
        />
        <Button type="submit" text="Search" />
        <Button
          type="button"
          onClick={handleClearSearch}
          disabled={!searchInput && !activeQuery}
          text="Clear"
        />
      </SearchBar>
      <h1>Posts Explorer</h1>

      <PostContainer>
        <List>
          {posts.map((post) => (
            <ListItem key={post.id}>
              <Title>{post.id}</Title>
              <Content>{post.body}</Content>
            </ListItem>
          ))}

          <Sentinel ref={loadMoreRef} />

          {!hasMore && posts.length > 0 && (
            <LastListItem>No more posts</LastListItem>
          )}
        </List>
      </PostContainer>
      {loading && (
        <div role="status" aria-live="polite">
          Loading…
        </div>
      )}
      {error && (
        <ErrorContainer>
          <ErrorMessage>{error}</ErrorMessage>
          <ErrorMessage>
            <Button onClick={handleRetry} disabled={loading} text="Retry" />
          </ErrorMessage>
        </ErrorContainer>
      )}
      {!hasMore && posts.length === 0 && (
        <div>No posts found that match your search term</div>
      )}
    </Container>
  );
}

export default PostsExplorer;
