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
  justify-content: center;
  align-items: center;
  width: 100%;
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
          <h1>Intro text</h1>
        </Intro>
        <CardContainer>
          <Card to={'./todo'} title={'Todo List'}>
            text
          </Card>
          <Card to={'./page2'} title={'title'}>
            some longer text here
          </Card>
          <Card to={'./page3'} title={'title'}>
            some text here
          </Card>
          <Card to={'./page4'} title={'title'}>
            some really really long text that will wrap to a new line here
          </Card>
        </CardContainer>
      </MainLayout>
    </>
  );
}

export default Home;
