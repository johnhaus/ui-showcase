import styled from 'styled-components';
import { StyledButton } from '../Button/Button';

const Label = styled.label`
  display: inline-flex;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`;

const HiddenRadio = styled.input`
  position: absolute;
  opacity: 0;
`;

const Button = styled(StyledButton)`
  width: 100%;

  opacity: ${({ $checked }) => ($checked ? 1 : 0.6)};
  border: 2px solid
    ${({ $checked, theme }) =>
      $checked ? theme.colors.border.inverseStrong : 'transparent'};
`;

export default function RadioButton({
  name,
  value,
  checked,
  onChange,
  children,
  fullWidth,
}) {
  return (
    <Label $fullWidth={fullWidth}>
      <HiddenRadio
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
      />

      <Button as="span" $checked={checked} $fullWidth>
        {children}
      </Button>
    </Label>
  );
}
