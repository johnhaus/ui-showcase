import Hamburger from "./Hamburger";
import NavMenu from "./NavMenu";

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
        <Hamburger open={menuOpen} toggle={() => setMenuOpen(!menuOpen)} />
        <NavMenu
          open={menuOpen}
          isMobile={isMobile}
          navItems={navItems}
          onNavigate={(path) => {
            navigate(path);
            setMenuOpen(false);
          }}
        />
      </div>
    </HeaderWrapper>
  );
};

export default Header;
