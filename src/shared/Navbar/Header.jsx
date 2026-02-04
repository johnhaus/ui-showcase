import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { FaGithub } from 'react-icons/fa';
import styled from 'styled-components';
import Hamburger from './Hamburger';
import NavMenu from './NavMenu';

const HeaderWrapper = styled.header`
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.accent.primary};
`;

const HomeNavLink = styled(NavLink)`
  text-decoration: none;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text.fixedLight};
  transition: all 0.3s ease;
  display: block;
  width: 100%;

  &:hover {
    text-shadow:
      0 0 20px ${({ theme }) => theme.colors.action.hoverFixed};,
      0 0 25px ${({ theme }) => theme.colors.action.hoverFixed};,
  }
`;

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Settings', path: '/settings' },
    {
      name: 'GitHub',
      path: 'https://github.com/johnhaus',
      icon: FaGithub,
      external: true,
    },
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
      <div>
        <HomeNavLink to="/">Demo Website</HomeNavLink>
      </div>
      <div ref={menuRef}>
        <Hamburger
          toggle={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
        />
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
