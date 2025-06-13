export const formatCurrency = (price: number, currency: string) => {
  const symbol = currency === "₹" ? "₹" : "SAR";
  return `${symbol}${price.toFixed(2)}`;
};

export const formatCalories = (calories?: number) => {
  return calories ? `${calories} cal` : "--";
};
