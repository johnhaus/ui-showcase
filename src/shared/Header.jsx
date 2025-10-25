import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router";
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  height: 40px;
  background-color: #8B0000;
`;

const NavLinks = styled.nav`
  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;

    @media (max-width: 768px) {
      flex-direction: column;
      background-color: #8B0000;
      position: absolute;
      top: 70px;
      right: 0;
      width: 200px;
      display: ${({ open }) => (open ? "flex" : "none")};
      padding: 10px;
      border-radius: 4px;
    }
  }

  li {
    margin-right: 20px;
    border-radius: 4px;
    transition: background-color 0.3s ease;

    @media (max-width: 768px) {
      margin: 10px 0;
      cursor: pointer;
      padding: 8px 12px;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      &:active {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-size: 18px;
  color: #D3D3D3;
  transition: all 0.3s ease;
  display: block;
  width: 100%;
  height: 100%;

  &:hover {
    text-shadow: 
      0 0 20px rgba(255, 255, 255, 1),
      0 0 25px rgba(255, 255, 255, 1);
  }

  @media (max-width: 768px) {
    &:hover {
      text-shadow: none;
    }
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  span {
    height: 3px;
    width: 25px;
    background: #d3d3d3;
    margin-bottom: 4px;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <HeaderWrapper>
      <div>Demo Website</div>
      <div ref={menuRef}>
        <Hamburger onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </Hamburger>
        <NavLinks open={menuOpen}>
          <ul>
            {navItems.map((item) => (
              <li
                key={item.name}
                onClick={() => {
                  if (isMobile) {
                    navigate(item.path);
                    setMenuOpen(false);
                  }
                }}
              >
                <StyledNavLink to={item.path}>{item.name}</StyledNavLink>
              </li>
            ))}
          </ul>
        </NavLinks>
      </div>
    </HeaderWrapper>
  );
};

export default Header;
