import { css } from 'styled-components';

export const cardStyles = css`
  border: 5px solid ${({ theme }) => theme.colors.accent.primary};
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background.surface};
  color: ${({ theme }) => theme.colors.text.onSurface};
  box-shadow: 0 0px 12px ${({ theme }) => theme.colors.emphasis.high};
  transition: all 0.3s ease-in-out;
  text-decoration: none;
`;
