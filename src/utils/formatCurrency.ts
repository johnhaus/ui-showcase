const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatCurrency = (amountInCents: number): string =>
  formatter.format(amountInCents / 100);
