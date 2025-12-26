import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { cardStyles } from '../styles/cardStyles';

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

function Page3() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      axios
        .get('https://jsonplaceholder.typicode.com/posts/')
        .then((response) => {
          setUsers(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError('Failed to fetch data');
          setLoading(false);
        });
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Container>
      <MenuBar>Menu Bar</MenuBar>
      <h1>Posts</h1>

      <PostContainer>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <List>
            {users.map((user) => (
              <ListItem key={user.id}>
                <Title>{user.title}</Title>
                <Content>{user.body}</Content>
              </ListItem>
            ))}
          </List>
        )}
      </PostContainer>
    </Container>
  );
}

export default Page3;
