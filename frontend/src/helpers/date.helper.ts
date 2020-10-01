
export const parseDate = (date: Date): string => {
  const dt = new Date(date.toString());
  return `${dt.toLocaleDateString()} ${dt.toLocaleTimeString()}`;
};
