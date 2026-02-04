import { css } from 'styled-components';

const navLinkStyles = css`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text.fixedLight};
  transition: all 0.3s ease;
  display: block;
  width: 100%;

  &:hover {
    text-shadow:
      0 0 20px ${({ theme }) => theme.colors.action.hoverFixed},
      0 0 25px ${({ theme }) => theme.colors.action.hoverFixed};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    &:hover {
      text-shadow: none;
    }
  }
`;

export default navLinkStyles;
