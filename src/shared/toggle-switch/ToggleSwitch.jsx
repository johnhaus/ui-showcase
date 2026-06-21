import styled from 'styled-components';

const ToggleLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 12px;

  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`;

const ToggleInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  pointer-events: none;
`;

const ToggleTrack = styled.span`
  position: relative;
  width: 48px;
  height: 24px;
  border-radius: 999px;
  transition: background-color 0.2s ease;

  input:focus-visible + & {
    outline: auto;
  }

  background-color: ${({ theme, $checked }) =>
    $checked ? theme.colors.accent.primary : theme.colors.control.background};
`;

const ToggleThumb = styled.span`
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ theme }) =>
    theme.colors.background.fixedLight};
  transition: transform 0.2s ease;
  transform: ${({ $checked }) =>
    $checked ? 'translateX(24px)' : 'translateX(0)'};
`;

const ToggleSwitch = ({
  checked,
  disabled = false,
  onChange,
  label,
  ...props
}) => {
  return (
    <ToggleLabel $disabled={disabled}>
      <ToggleInput
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        {...props}
      />

      <ToggleTrack $checked={checked}>
  		<ToggleThumb $checked={checked} />
      </ToggleTrack>

      {label && <span>{label}</span>}
    </ToggleLabel>
  );
};

export default ToggleSwitch;
