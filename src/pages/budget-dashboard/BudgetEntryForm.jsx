import { useState } from 'react';
import styled from 'styled-components';
import Button from '../../shared/button/Button';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: none;
  font-size: 16px;

  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.focus.ring};
  }
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.background.surface};

  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.focus.ring};
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
`;

const BudgetEntryForm = ({ onSubmit }) => {
  const [type, setType] = useState('income');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description.trim() || Number(amount) <= 0) {
      return;
    }

    onSubmit({
      id: crypto.randomUUID(),
      type,
      description: description.trim(),
      amount: Number(amount),
    });

    setType('income');
    setDescription('');
    setAmount('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <Label htmlFor="entry-type">Type</Label>
        <Select
          id="entry-type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </Select>
      </Field>

      <Field>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
      </Field>

      <Field>
        <Label htmlFor="amount">Amount</Label>
        <Input
           id="amount"
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            required
        />
      </Field>

      <Button type="submit" text="Add Entry" size="md"/>
    </Form>
  );
};

export default BudgetEntryForm;
