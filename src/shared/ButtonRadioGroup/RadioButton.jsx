import styled from 'styled-components';
import { StyledButton } from '../Button/Button';

const Label = styled.label`
  display: inline-flex;
`;

const HiddenRadio = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

const Button = styled(StyledButton)`
  opacity: ${({ $checked }) => ($checked ? 1 : 0.6)};
  border: 2px solid
    ${({ $checked, theme }) => ($checked ? theme.colors.white : 'transparent')};
`;

export default function RadioButton({
  name,
  value,
  checked,
  onChange,
  children,
}) {
  return (
    <Label>
      <HiddenRadio
        type="radio"
        name={name}
        checked={checked}
        onChange={() => onChange(value)}
      />
      <Button as="span" $checked={checked}>
        {children}
      </Button>
    </Label>
  );
}
