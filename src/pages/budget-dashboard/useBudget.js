import { useState } from 'react';
import { ENTRY_TYPES } from './constants';

export const useBudget = () => {
  const [entries, setEntries] = useState([]);

  const income = entries.filter((entry) => entry.type === ENTRY_TYPES.INCOME);

  const expenses = entries.filter(
    (entry) => entry.type === ENTRY_TYPES.EXPENSE
  );

  const totalIncome = income.reduce(
    (sum, entry) => sum + entry.amountInCents,
    0
  );

  const totalExpenses = expenses.reduce(
    (sum, entry) => sum + entry.amountInCents,
    0
  );

  const remainingBudget = totalIncome - totalExpenses;

  const addEntry = (entry) => {
    setEntries((current) => [
      ...current,
      {
        ...entry,
        id: crypto.randomUUID(),
      },
    ]);
  };

  return {
    entries,
    income,
    expenses,
    totalIncome,
    totalExpenses,
    remainingBudget,
    addEntry,
  };
};

export default useBudget;
