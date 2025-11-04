import { Outlet } from 'react-router';
import Header from './shared/navbar/header';

const Layout = () => {
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
