import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import useBudget from './useBudget';
import { ENTRY_TYPES } from './constants';

describe('useBudget', () => {
  it('starts with an empty budget', () => {
    const { result } = renderHook(() => useBudget());

    expect(result.current.entries).toEqual([]);
    expect(result.current.income).toEqual([]);
    expect(result.current.expenses).toEqual([]);
    expect(result.current.totalIncome).toBe(0);
    expect(result.current.totalExpenses).toBe(0);
    expect(result.current.remainingBudget).toBe(0);
  });

  it('adds an income entry', () => {
    const { result } = renderHook(() => useBudget());

    const entry = {
      id: '1',
      description: 'Salary',
      amountInCents: 500000,
      type: ENTRY_TYPES.INCOME,
    };

    act(() => {
      result.current.addEntry(entry);
    });

    expect(result.current.entries).toEqual([entry]);
    expect(result.current.income).toEqual([entry]);
    expect(result.current.expenses).toEqual([]);
    expect(result.current.totalIncome).toBe(500000);
    expect(result.current.totalExpenses).toBe(0);
    expect(result.current.remainingBudget).toBe(500000);
  });

  it('adds an expense entry', () => {
    const { result } = renderHook(() => useBudget());

    const entry = {
      id: '1',
      description: 'Groceries',
      amountInCents: 7500,
      type: ENTRY_TYPES.EXPENSE,
    };

    act(() => {
      result.current.addEntry(entry);
    });

    expect(result.current.entries).toEqual([entry]);
    expect(result.current.income).toEqual([]);
    expect(result.current.expenses).toEqual([entry]);
    expect(result.current.totalIncome).toBe(0);
    expect(result.current.totalExpenses).toBe(7500);
    expect(result.current.remainingBudget).toBe(-7500);
  });

  it('calculates totals from multiple income and expense entries', () => {
    const { result } = renderHook(() => useBudget());

    const salary = {
      id: '1',
      description: 'Salary',
      amountInCents: 500000,
      type: ENTRY_TYPES.INCOME,
    };

    const freelance = {
      id: '2',
      description: 'Freelance',
      amountInCents: 125000,
      type: ENTRY_TYPES.INCOME,
    };

    const rent = {
      id: '3',
      description: 'Rent',
      amountInCents: 150000,
      type: ENTRY_TYPES.EXPENSE,
    };

    const groceries = {
      id: '4',
      description: 'Groceries',
      amountInCents: 35000,
      type: ENTRY_TYPES.EXPENSE,
    };

    act(() => {
      result.current.addEntry(salary);
      result.current.addEntry(freelance);
      result.current.addEntry(rent);
      result.current.addEntry(groceries);
    });

    expect(result.current.entries).toEqual([
      salary,
      freelance,
      rent,
      groceries,
    ]);

    expect(result.current.income).toEqual([salary, freelance]);
    expect(result.current.expenses).toEqual([rent, groceries]);

    expect(result.current.totalIncome).toBe(625000);
    expect(result.current.totalExpenses).toBe(185000);
    expect(result.current.remainingBudget).toBe(440000);
  });

  it('handles zero-value entries', () => {
    const { result } = renderHook(() => useBudget());

    const income = {
      id: '1',
      description: 'Bonus',
      amountInCents: 0,
      type: ENTRY_TYPES.INCOME,
    };

    const expense = {
      id: '2',
      description: 'Free item',
      amountInCents: 0,
      type: ENTRY_TYPES.EXPENSE,
    };

    act(() => {
      result.current.addEntry(income);
      result.current.addEntry(expense);
    });

    expect(result.current.totalIncome).toBe(0);
    expect(result.current.totalExpenses).toBe(0);
    expect(result.current.remainingBudget).toBe(0);
  });
});
