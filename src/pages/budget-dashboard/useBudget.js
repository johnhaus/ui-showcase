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

  const updateEntry = (entryId, updates) => {
    setEntries((current) =>
      current.map((entry) =>
        entry.id === entryId ? { ...entry, ...updates } : entry
      )
    );
  };

  const removeEntry = (entryId) => {
    setEntries((current) => current.filter((entry) => entry.id !== entryId));
  };

  return {
    entries,
    income,
    expenses,
    totalIncome,
    totalExpenses,
    remainingBudget,
    addEntry,
    updateEntry,
    removeEntry,
  };
};

export default useBudget;
