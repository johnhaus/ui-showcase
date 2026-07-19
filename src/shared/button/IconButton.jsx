import styled from 'styled-components';

const StyledIconButton = styled.button`
  appearance: none;
  background: none;
  color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  font-size: 24px;

  width: 44px;
  height: 44px;
  border-radius: 5px;

  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.action.hover};
  }

  &:disabled {
    cursor: not-allowed;
    background: ${({ theme }) => theme.colors.action.disabled};
  }
`;

const IconButton = ({
  children,
  type = 'button',
  disabled = false,
  ...props
}) => (
  <StyledIconButton type={type} disabled={disabled} {...props}>
    {children}
  </StyledIconButton>
);

export default IconButton;
