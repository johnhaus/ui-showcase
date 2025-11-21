import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { theme } from './theme.js';
import Home from './Home.jsx';
import About from './About.jsx';
import Todo from './pages/todo/Todo.jsx';
import Page2 from './pages/Page2.jsx';
import Page3 from './pages/Page3.jsx';
import Page4 from './pages/Page4.jsx';
import Layout from './Layout';

const root = document.getElementById('root');

const GlobalStyles = createGlobalStyle`
  :root {
    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.black};
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  #root {
    height: 100%;
  }
`;

ReactDOM.createRoot(root).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="todo" element={<Todo />} />
            <Route path="page2" element={<Page2 />} />
            <Route path="page3" element={<Page3 />} />
            <Route path="page4" element={<Page4 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
