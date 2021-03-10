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

export const capitalize = (value: string): string => {
  return value[0].toUpperCase() + value.substring(1);
};

export const abbreviateAddress = (address: string): string => {
  if (!address) return address;
  return `${address.substring(0, 5)}...${address.substring(
    address.length - 3,
    address.length
  )}`;
};
