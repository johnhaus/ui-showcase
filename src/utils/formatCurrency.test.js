import { formatCurrency } from './formatCurrency';

describe('formatCurrency', () => {
  it('formats whole dollars', () => {
    expect(formatCurrency(1000)).toBe('$10.00');
  });

  it('formats cents', () => {
    expect(formatCurrency(99)).toBe('$0.99');
  });

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('formats negative amounts', () => {
    expect(formatCurrency(-250)).toBe('-$2.50');
  });
});
