import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #8b0000;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  margin-top: 15px;
  width: 100%;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const Button = ({ onClick }) => {
  return <StyledButton onClick={onClick}>Add Task</StyledButton>;
};

export default Button;
