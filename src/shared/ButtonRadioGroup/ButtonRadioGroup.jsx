import React from 'react';
import styled from 'styled-components';
import RadioButton from './RadioButton';

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export default function ButtonRadioGroup({ name, value, onChange, options }) {
  return (
    <Group role="radiogroup">
      {options.map((option) => (
        <RadioButton
          key={option.value}
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={onChange}
        >
          {option.label}
        </RadioButton>
      ))}
    </Group>
  );
}
