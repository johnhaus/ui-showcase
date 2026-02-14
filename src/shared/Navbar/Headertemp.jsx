import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { FaGithub } from 'react-icons/fa';
import styled from 'styled-components';
import Hamburger from './Hamburger';
import NavMenu from './NavMenu';
import useBreakpoint from '../../hooks/useBreakpoint';

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
  const isMobile = useBreakpoint('mobile');

  const navItems = [
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
    navigate(path);
    if (isMobile) setMenuOpen(false);
  };

  const tabIndex = !isMobile || menuOpen ? undefined : -1;

  return (
    <HeaderWrapper>
      <div>
        <HomeNavLink to="/">UI Showcase</HomeNavLink>
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
          tabIndex={tabIndex}
          isMobile={isMobile}
        />
      </div>
    </HeaderWrapper>
  );
};

export default Header;
