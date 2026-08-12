import React from 'react';
import styled from 'styled-components';
import { formatCurrency } from '../../utils/formatCurrency';

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const BudgetEntry = styled.li`
  color: ${({ theme }) => theme.colors.text.fixedDark};
  background-color: ${({ theme }) => theme.colors.background.raised};
  padding: 10px;
  margin: 8px 0;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

const Description = styled.span`
  font-weight: 500;
  min-width: 0;
  overflow-wrap: anywhere;
`;

const EmptyState = styled.p`
  margin: 0;
  opacity: 0.7;
`;

const BudgetEntryRow = ({ entry }) => (
  <BudgetEntry>
    <Description>{entry.description}</Description>
    <div>{formatCurrency(entry.amountInCents)}</div>
  </BudgetEntry>
);

const BudgetEntryList = ({ entries, emptyMessage }) => {
  if (entries.length === 0) {
    return <EmptyState>{emptyMessage}</EmptyState>;
  }

  return (
    <List>
      {entries.map((entry) => (
        <BudgetEntryRow key={entry.id} entry={entry} />
      ))}
    </List>
  );
};

export default BudgetEntryList;
