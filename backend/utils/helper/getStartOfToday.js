export const getStartOfToday = () => {
  const today = new Date();
  const utcHours = today.getUTCHours();
  if (utcHours >= 17) {
    today.setHours(17, 0, 0, 0);
  } else {
    today.setDate(today.getDate() - 1);
    today.setHours(17, 0, 0, 0);
  }
  console.log(today);
  return today;
};
