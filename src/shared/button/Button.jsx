import StyledButton from './StyledButton';

const Button = ({
  type = 'button',
  onClick,
  text,
  width,
  fullWidth = false,
  size = 'md',
  disabled = false,
}) => {
  return (
    <StyledButton
      type={type}
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
