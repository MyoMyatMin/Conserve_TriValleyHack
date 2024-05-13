import User from "../../models/userModel.js";
import DailyTotalRecord from "../../models/dailyTotalRecordModel.js";
import { getStartOfToday } from "./getStartOfToday.js";

const updateAnsweredStreak = async (user_id) => {
  try {
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const today = getStartOfToday();

    const dailyRecord = await DailyTotalRecord.findOne({
      user_id: user_id,
      updatedAt: { $gte: yesterday, $lt: today },
    });

    const user = await User.findById(user_id);

    if (dailyRecord) {
      user.streak = (user.streak || 0) + 1;
    } else {
      user.streak = 1;
    }

    await user.save();
  } catch (error) {
    console.log("Error:", error);
  }
};

export default updateAnsweredStreak;
