import { css } from 'styled-components';

const navLinkStyles = css`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.white};
  transition: all 0.3s ease;
  display: block;
  width: 100%;

  &:hover {
    text-shadow:
      0 0 20px ${({ theme }) => theme.colors.hoverWhite},
      0 0 25px ${({ theme }) => theme.colors.hoverWhite};
  }

  @media (max-width: 768px) {
    &:hover {
      text-shadow: none;
    }
  }
`;

export default navLinkStyles;
