import React from 'react';
import styled from 'styled-components';
import RadioButton from './RadioButton';

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
`;

export default function ButtonRadioGroup({
  name,
  value,
  onChange,
  options,
  fullWidth,
}) {
  return (
    <Group role="radiogroup">
      {options.map((option) => (
        <RadioButton
          key={option.value}
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={onChange}
          fullWidth={fullWidth}
        >
          {option.label}
        </RadioButton>
      ))}
    </Group>
  );
}
