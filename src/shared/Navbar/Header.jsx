import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router';
import styled from 'styled-components';
import Hamburger from './Hamburger';
import NavMenu from './NavMenu';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.red};
`;

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!menuRef.current?.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigate = (path) => {
    const isMobile = window.innerWidth <= 768;
    navigate(path);
    if (isMobile) setMenuOpen(false);
  };

  return (
    <HeaderWrapper>
      <div>Demo Website</div>
      <div ref={menuRef}>
        <Hamburger toggle={() => setMenuOpen(!menuOpen)} />
        <NavMenu
          open={menuOpen}
          navItems={navItems}
          onNavigate={handleNavigate}
        />
      </div>
    </HeaderWrapper>
  );
};

export default Header;
