import { NavLink } from 'react-router';
import styled from 'styled-components';
import navLinkStyles from '../../styles/navLinkStyles';

const NavLinks = styled.nav`
  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;

    @media (max-width: 768px) {
      flex-direction: column;
      background-color: ${({ theme }) => theme.colors.accent.primary};
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
    display: flex;
    align-items: center;
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
        background-color: ${({ theme }) =>
          theme.colors.action.hoverSubtleFixed};
      }

      &:active {
        background-color: ${({ theme }) =>
          theme.colors.action.hoverSubtleFixed};
        transform: scale(0.98);
      }

      &::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 0;
        height: 0;
        transform: translate(-50%, -50%);
        opacity: 0;
        pointer-events: none;
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
  font-size: 18px;
  ${navLinkStyles}
`;

const StyledExternalLink = styled.a`
  font-size: 22px;
  ${navLinkStyles}
`;

const IconWrapper = styled.div`
  line-height: 0;

  svg {
    display: block;
  }
`;

const NavMenu = ({ open, navItems, onNavigate }) => (
  <NavLinks open={open}>
    <ul>
      {navItems.map((item) => {
        const Icon = item.icon;

        return (
          <li key={item.name}>
            {item.external ? (
              <StyledExternalLink
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
                className="nav-link"
              >
                <IconWrapper>
                  <Icon />
                </IconWrapper>
              </StyledExternalLink>
            ) : (
              <StyledNavLink
                to={item.path}
                onClick={() => onNavigate(item.path)}
              >
                {item.name}
              </StyledNavLink>
            )}
          </li>
        );
      })}
    </ul>
  </NavLinks>
);

export default NavMenu;
