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
      description: 'Salary',
      amountInCents: 500000,
      type: ENTRY_TYPES.INCOME,
    };

    act(() => {
      result.current.addEntry(entry);
    });

    expect(result.current.entries).toHaveLength(1);
    expect(result.current.entries[0]).toMatchObject(entry);
    expect(result.current.entries[0].id).toBeDefined();
    expect(result.current.income).toEqual([result.current.entries[0]]);
    expect(result.current.expenses).toEqual([]);
    expect(result.current.totalIncome).toBe(500000);
    expect(result.current.totalExpenses).toBe(0);
    expect(result.current.remainingBudget).toBe(500000);
  });

  it('adds an expense entry', () => {
    const { result } = renderHook(() => useBudget());

    const entry = {
      description: 'Groceries',
      amountInCents: 7500,
      type: ENTRY_TYPES.EXPENSE,
    };

    act(() => {
      result.current.addEntry(entry);
    });

    expect(result.current.entries).toHaveLength(1);
    expect(result.current.entries[0]).toMatchObject(entry);
    expect(result.current.entries[0].id).toBeDefined();
    expect(result.current.expenses).toEqual([result.current.entries[0]]);
    expect(result.current.income).toEqual([]);
    expect(result.current.totalIncome).toBe(0);
    expect(result.current.totalExpenses).toBe(7500);
    expect(result.current.remainingBudget).toBe(-7500);
  });

  it('calculates totals from multiple income and expense entries', () => {
    const { result } = renderHook(() => useBudget());

    const salary = {
      description: 'Salary',
      amountInCents: 500000,
      type: ENTRY_TYPES.INCOME,
    };

    const freelance = {
      description: 'Freelance',
      amountInCents: 125000,
      type: ENTRY_TYPES.INCOME,
    };

    const rent = {
      description: 'Rent',
      amountInCents: 150000,
      type: ENTRY_TYPES.EXPENSE,
    };

    const groceries = {
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

    expect(result.current.entries).toHaveLength(4);
    expect(result.current.entries).toEqual([
      expect.objectContaining(salary),
      expect.objectContaining(freelance),
      expect.objectContaining(rent),
      expect.objectContaining(groceries),
    ]);

    expect(result.current.income).toEqual([
      expect.objectContaining(salary),
      expect.objectContaining(freelance),
    ]);

    expect(result.current.expenses).toEqual([
      expect.objectContaining(rent),
      expect.objectContaining(groceries),
    ]);

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
