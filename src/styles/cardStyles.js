import { css } from 'styled-components';

export const cardStyles = css`
  border: 5px solid ${({ theme }) => theme.colors.red};
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  box-shadow: 0 0px 12px ${({ theme }) => theme.colors.white};
  transition: all 0.3s ease-in-out;
  text-decoration: none;
`;
