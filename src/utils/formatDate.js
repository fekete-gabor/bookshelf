export const formatDate = (date) => {
  const formatted = date.replaceAll("-", ".");
  return formatted;
};
