export const getDate = (
  date: string,
  formatMonth: "long" | "numeric" | "2-digit" | "short" | "narrow" = "long",
  local = "ru"
): string => {
  return new Date(date).toLocaleString(local, {
    year: "numeric",
    month: formatMonth,
    day: "numeric",
  });
};
