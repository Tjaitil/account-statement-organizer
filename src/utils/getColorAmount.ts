export const getColorFromAmount = (amount: number) => {
  if (amount === 0) {
    return;
  }
  return amount > 0 ? 'text-green-500' : 'text-red-500';
};
