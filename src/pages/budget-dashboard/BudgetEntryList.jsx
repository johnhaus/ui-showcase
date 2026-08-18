import React, { useState } from 'react';
import styled from 'styled-components';
import { formatCurrency } from '../../utils/formatCurrency';
import RoundButton from '../../shared/button/RoundButton';
import { FaTrashAlt, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { MAX_AMOUNT_IN_CENTS } from './constants';

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  container-type: inline-size;
`;

const BudgetEntry = styled.li`
  color: ${({ theme }) => theme.colors.text.fixedDark};
  background-color: ${({ theme }) => theme.colors.background.raised};
  padding: 10px;
  margin: 8px 0;
  border-radius: 5px;

  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 8px 16px;

  @container (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

const EntryDetails = styled.div`
  min-width: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
`;

const Description = styled.span`
  font-weight: 500;
  min-width: 0;
  overflow-wrap: anywhere;
`;

const Amount = styled.span`
  overflow-wrap: anywhere;
`;

const EditForm = styled.form`
  display: contents;
`;

const EditInput = styled.input`
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const EmptyState = styled.p`
  margin: 0;
  opacity: 0.7;
`;

const BudgetEntryRow = ({ entry, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(entry.description);
  const [amount, setAmount] = useState((entry.amountInCents / 100).toFixed(2));

  const handleSave = () => {
    const parsedAmount = Number.parseFloat(amount);
    const amountInCents = Math.round(parsedAmount * 100);

    if (
      !description.trim() ||
      Number.isNaN(parsedAmount) ||
      amountInCents <= 0 ||
      amountInCents > MAX_AMOUNT_IN_CENTS
    ) {
      return;
    }

    onUpdate(entry.id, {
      description: description.trim(),
      amountInCents,
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setDescription(entry.description);
    setAmount((entry.amountInCents / 100).toFixed(2));
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <BudgetEntry>
        <EditForm onSubmit={handleSave}>
          <EntryDetails>
            <EditInput
              aria-label={`Description for ${entry.description}`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <EditInput
              aria-label={`Amount for ${entry.description}`}
              type="number"
              min="0.01"
              max={MAX_AMOUNT_IN_CENTS / 100}
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </EntryDetails>

          <Actions>
            <RoundButton
              type="submit"
              icon={<FaCheck />}
              aria-label={`Save ${entry.description}`}
              $bgColor={({ theme }) => theme.colors.intent.success}
            />

            <RoundButton
              type="button"
              icon={<FaTimes />}
              aria-label={`Cancel editing ${entry.description}`}
              $bgColor={({ theme }) => theme.colors.accent.primary}
              onClick={handleCancel}
            />
          </Actions>
        </EditForm>
      </BudgetEntry>
    );
  }

  return (
    <BudgetEntry>
      <EntryDetails>
        <Description>{entry.description}</Description>
        <Amount>{formatCurrency(entry.amountInCents)}</Amount>
      </EntryDetails>

      <Actions>
        <RoundButton
          icon={<FaEdit />}
          aria-label={`Edit ${entry.description}`}
          $bgColor={({ theme }) => theme.colors.intent.warning}
          onClick={() => setIsEditing(true)}
        />

        <RoundButton
          icon={<FaTrashAlt />}
          aria-label={`Delete ${entry.description}`}
          $bgColor={({ theme }) => theme.colors.accent.primary}
          onClick={() => onDelete(entry.id)}
        />
      </Actions>
    </BudgetEntry>
  );
};

const BudgetEntryList = ({ entries, emptyMessage, onDelete, onUpdate }) => {
  if (entries.length === 0) {
    return <EmptyState>{emptyMessage}</EmptyState>;
  }

  return (
    <List>
      {entries.map((entry) => (
        <BudgetEntryRow
          key={entry.id}
          entry={entry}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </List>
  );
};

export default BudgetEntryList;
