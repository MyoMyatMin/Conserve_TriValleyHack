const getThisMonthElectricity = async (user_id, Record) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const forMonth = `${currentYear}-${String(currentMonth).padStart(2, "0")}`;
  const record = await Record.findOne({
    user_id,
    forMonth,
  });
  return record ? record.data : 0;
};

export default getThisMonthElectricity;
