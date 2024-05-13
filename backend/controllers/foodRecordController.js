import foodRecord from "../models/foodRecordModel.js";
import DailyTotalRecord from "../models/dailyTotalRecordModel.js";
import DailyStreak from "../models/dayStreakModel.js";
import { getStartOfToday } from "../utils/helper/getStartOfToday.js";
import updateStreak from "../utils/helper/streakUpdater.js";
import morningRecord from "../utils/helper/morningRecord.js";
import noonRecord from "../utils/helper/noonRecord.js";
import eveningRecord from "../utils/helper/eveningRecord.js";

const getTodayFoodRecord = async (req, res) => {
  try {
    const user_id = req.user._id;

    const startOfToday = getStartOfToday();

    const todayRecord = await foodRecord.findOne({
      user_id: user_id,
      createdAt: { $gte: startOfToday },
    });

    let responseData = todayRecord ? todayRecord.data : 0;

    res.status(200).json({ data: responseData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const morningFoodRecord = async (req, res) => {
  await morningRecord(foodRecord, req, res);
};

const noonFoodRecord = async (req, res) => {
  await noonRecord(foodRecord, req, res);
};

const eveningFoodRecord = async (req, res) => {
  await eveningRecord(foodRecord, req, res);
};

export {
  getTodayFoodRecord,
  morningFoodRecord,
  noonFoodRecord,
  eveningFoodRecord,
};
