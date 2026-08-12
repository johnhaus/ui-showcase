import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ThemeProvider } from 'styled-components';
import BudgetEntryList from './BudgetEntryList';
import { ENTRY_TYPES } from './constants';
import { lightTheme } from '../../theme/theme';

const renderBudgetEntryList = (props) =>
  render(
    <ThemeProvider theme={lightTheme}>
      <BudgetEntryList {...props} />
    </ThemeProvider>
  );

describe('BudgetEntryList', () => {
  it('renders the empty state when there are no entries', () => {
    renderBudgetEntryList({
      entries: [],
      emptyMessage: 'No income entries yet.',
    });

    expect(screen.getByText('No income entries yet.')).toBeInTheDocument();
  });

  it('renders each budget entry', () => {
    const entries = [
      {
        id: '1',
        description: 'Salary',
        amountInCents: 500000,
        type: ENTRY_TYPES.INCOME,
      },
      {
        id: '2',
        description: 'Rent',
        amountInCents: 150000,
        type: ENTRY_TYPES.EXPENSE,
      },
    ];

    renderBudgetEntryList({ entries });

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.getByText('Rent')).toBeInTheDocument();
  });

  it('formats entry amounts as currency', () => {
    const entries = [
      {
        id: '1',
        description: 'Salary',
        amountInCents: 500000,
        type: ENTRY_TYPES.INCOME,
      },
      {
        id: '2',
        description: 'Freelance',
        amountInCents: 125000,
        type: ENTRY_TYPES.INCOME,
      },
    ];

    renderBudgetEntryList({ entries });

    expect(screen.getByText('$5,000.00')).toBeInTheDocument();
    expect(screen.getByText('$1,250.00')).toBeInTheDocument();
  });
});
