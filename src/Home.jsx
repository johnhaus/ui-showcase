import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Header from './shared/navbar/header';

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

const Card = styled.div`
  width: 300px;
  height: 300px;
  border: 5px solid #8b0000;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.87);
  color: #242424;
`;

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <MainLayout>
        <Intro>
          <h1>Intro text</h1>
        </Intro>
        <CardContainer>
          <Card>
            text
          </Card>
          <Card>
            some longer text here
          </Card>
          <Card>
            some text here
          </Card>
          <Card>
            some really really long text that will wrap to a new line here
          </Card>
        </CardContainer>
      </MainLayout>
    </>
  );
}

export default Home;
