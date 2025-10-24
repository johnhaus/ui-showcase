import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import Home from './Home.jsx'
import About from './About.jsx'
import { createGlobalStyle } from 'styled-components'

const root = document.getElementById("root");

const GlobalStyles = createGlobalStyle`
  #root {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }

`

ReactDOM.createRoot(root).render(
  <StrictMode>
    <GlobalStyles />
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
