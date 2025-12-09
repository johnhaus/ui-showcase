import styled from 'styled-components';
import { NavLink } from 'react-router';
import Card from './components/Card';

const MainLayout = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 40px;
  @media (max-width: 430px) {
    margin: 0 8px;
  }
`;

const Intro = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  max-width: 900px;
  height: 200px;
  font-size: 24px;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;
  max-width: 900px;
  gap: 16px;
  margin-bottom: 16px;
`;

function Home() {
  return (
    <>
      <MainLayout>
        <Intro>
          <h2>Welcome to my React and Vite demo page</h2>
        </Intro>
        <CardContainer>
          <Card to={'./todo'} title={'Todo List'}>
            A front-end only Todo List built with React. Add, edit, and remove tasks directly in the browser.
          </Card>
          <Card to={'./page2'} title={'In Development'}>
            This feature is currently being built. Check back soon.
          </Card>
          <Card to={'./page3'} title={'In Development'}>
            This feature is currently being built. Check back soon.
          </Card>
          <Card to={'./page4'} title={'In Development'}>
            This feature is currently being built. Check back soon.
          </Card>
        </CardContainer>
      </MainLayout>
    </>
  );
}

export default Home;
