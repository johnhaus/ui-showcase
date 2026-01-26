import React from 'react';
import styled from 'styled-components';

const heightMap = {
  sm: '32px',
  md: '44px',
  lg: '52px',
};

const paddingMap = {
  sm: '0 12px',
  md: '0 16px',
  lg: '0 20px',
};

export const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.accent.primary};
  color: ${({ theme }) => theme.colors.text.fixedLight};
  border: none;
  box-sizing: border-box;
  border-radius: 5px;

  width: ${({ $fullWidth, width }) => ($fullWidth ? '100%' : width || 'auto')};
  height: ${({ $size = 'md' }) => heightMap[$size]};
  padding: ${({ $size = 'md' }) => paddingMap[$size]};

  display: inline-flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
`;

const Button = ({
  onClick,
  text,
  width,
  fullWidth = false,
  size = 'md',
  disabled = false,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      $fullWidth={fullWidth}
      width={width}
      $size={size}
    >
      {text}
    </StyledButton>
  );
};

export default Button;
