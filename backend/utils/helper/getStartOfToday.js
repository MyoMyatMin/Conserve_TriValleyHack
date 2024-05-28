export const getStartOfToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let isoStartDate = today.toISOString();

  return isoStartDate;
};
