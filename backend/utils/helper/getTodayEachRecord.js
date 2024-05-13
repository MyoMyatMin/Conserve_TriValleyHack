import { getStartOfToday } from "./getStartOfToday.js";

const getTodayEachRecord = async (user_id, Record) => {
  const startOfToday = getStartOfToday();

  const todayRecord = await Record.findOne({
    user_id: user_id,
    createdAt: { $gte: startOfToday },
  });

  let responseData = todayRecord ? todayRecord.data : 0;
  return responseData;
};
export default getTodayEachRecord;
