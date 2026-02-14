import { Outlet } from 'react-router';
import Navbar from './shared/navbar/Navbar';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

const Layout = () => {
  return (
    <LayoutContainer>
      <Navbar />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </LayoutContainer>
  );
};

export default Layout;
