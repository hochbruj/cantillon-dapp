export const formatPercentage = (value: number): string => {
  return (value * 100).toFixed(1) + "%";
};

export const formatAmount = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value === -(-0) ? 0 : value);
};
