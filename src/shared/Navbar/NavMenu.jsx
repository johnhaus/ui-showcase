import { NavLink } from 'react-router';
import styled from 'styled-components';

const NavLinks = styled.nav`
  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;

    @media (max-width: 768px) {
      flex-direction: column;
      background-color: #8b0000;
      position: fixed;
      top: 70px;
      right: 0;
      width: 200px;
      border-radius: 4px;
      overflow: hidden;

      transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
      opacity: ${({ open }) => (open ? 1 : 0)};
      transition: all 0.35s ease-in-out;
    }
  }

  li {
    margin-right: 20px;
    border-radius: 4px;
    transition:
      background-color 0.3s ease,
      transform 0.1s ease;

    @media (max-width: 768px) {
      margin: 5px 0;
      cursor: pointer;
      padding: 10px 14px;
      position: relative;
      overflow: hidden;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      &:active {
        background-color: rgba(255, 255, 255, 0.15);
        transform: scale(0.98);
      }

      &::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 0;
        height: 0;
        background: radial-gradient(
          circle,
          rgba(255, 255, 255, 0.4) 10%,
          transparent 10.01%
        );
        transform: translate(-50%, -50%);
        opacity: 0;
        transition:
          width 0.4s ease,
          height 0.4s ease,
          opacity 0.4s ease;
      }

      &:active::after {
        width: 200%;
        height: 200%;
        opacity: 0;
        transition: 0s;
      }
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-size: 18px;
  color: #d3d3d3;
  transition: all 0.3s ease;
  display: block;
  width: 100%;

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

const NavMenu = ({ open, navItems, onNavigate }) => (
  <NavLinks open={open}>
    <ul>
      {navItems.map((item) => (
        <li key={item.name} onClick={() => onNavigate(item.path)}>
          <StyledNavLink to={item.path}>{item.name}</StyledNavLink>
        </li>
      ))}
    </ul>
  </NavLinks>
);

export default NavMenu;
