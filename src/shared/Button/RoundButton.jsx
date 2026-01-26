import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${({ $bgColor, theme }) =>
    $bgColor || theme.colors.control.background};
  color: ${({ theme }) => theme.colors.text.fixedLight};

  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 5px;
  font-size: 16px;

  &:hover {
    opacity: 0.8;
  }

  ${({ $isPriority, $priority, theme }) =>
    $isPriority &&
    `
      background-color: ${
        $priority
          ? theme.colors.intent.warning
          : theme.colors.control.background
      };
      color: ${
        $priority ? theme.colors.text.fixedLight : theme.colors.intent.warning
      };
      border: ${
        $priority ? 'none' : `2px solid ${theme.colors.intent.warning}`
      };
    `}
`;

const RoundButton = ({ icon, $bgColor, $isPriority, $priority, onClick }) => {
  return (
    <StyledButton
      $bgColor={$bgColor}
      $isPriority={$isPriority}
      $priority={$priority}
      onClick={onClick}
    >
      {icon}
    </StyledButton>
  );
};

export default RoundButton;
