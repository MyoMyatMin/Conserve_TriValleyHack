import { getStartOfToday } from "./getStartOfToday.js";

const getTodayEachRecord = async (user_id, Record) => {
  const startOfToday = getStartOfToday();
  console.log(startOfToday);
  const todayRecord = await Record.findOne({
    user_id: user_id,
    createdAt: { $gte: startOfToday },
  });
  console.log(todayRecord);
  let responseData = todayRecord ? todayRecord.data : 0;
  return responseData;
};
export default getTodayEachRecord;
