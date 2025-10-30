import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import styled, { keyframes } from 'styled-components';
import Header from './shared/navbar/header';

const GreenText = styled.p`
  color: green;
`;

const GreyText = styled.p`
  color: #888;
`;

const LogoImage = styled.img`
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
`;

const Card = styled.div`
  padding: 2em;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Rotate = styled(LogoImage)`
  animation: ${rotate} 20s linear infinite;
  &:hover {
    filter: drop-shadow(0 0 2em #61dafbaa);
  }
`;

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <LogoImage src={viteLogo} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <Rotate src={reactLogo} alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Card>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <GreenText>Home Page</GreenText>
      </Card>
      <GreyText>Click on the Vite and React logos to learn more</GreyText>
    </>
  );
}

export default Home;
