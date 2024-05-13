import recyclingRecord from "../models/recyclingRecordModel.js";
import DailyTotalRecord from "../models/dailyTotalRecordModel.js";
import morningRecord from "../utils/helper/morningRecord.js";
import noonRecord from "../utils/helper/noonRecord.js";
import eveningRecord from "../utils/helper/eveningRecord.js";

const getTodayRecyclingRecord = async (req, res) => {
  try {
    const user_id = req.user._id;

    const today = new Date();
    console.log(today);
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    console.log(startOfToday.toString());
    const todayRecord = await recyclingRecord.findOne({
      user_id: user_id,
      createdAt: { $gte: startOfToday },
    });

    let responseData = todayRecord ? todayRecord.data : 0;

    res.status(200).json({ data: responseData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const morningRecyclingRecord = async (req, res) => {
  await morningRecord(recyclingRecord, req, res);
};

const noonRecyclingRecord = async (req, res) => {
  await noonRecord(recyclingRecord, req, res);
};

const eveningRecyclingRecord = async (req, res) => {
  await eveningRecord(recyclingRecord, req, res);
};

export {
  getTodayRecyclingRecord,
  morningRecyclingRecord,
  noonRecyclingRecord,
  eveningRecyclingRecord,
};
