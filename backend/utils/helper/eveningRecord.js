import DailyTotalRecord from "../../models/dailyTotalRecordModel.js";
import updateStreak from "./streakUpdater.js";
import User from "../../models/userModel.js";
import { getStartOfToday } from "./getStartOfToday.js";
import {
  checkAchievements,
  checkFirstConserve,
  oneMonthStreakAnswered,
  sevenDaysConserveStreak,
  sevenDaysStreakAnswered,
  threeDaysConserveStreak,
} from "./checkAchievements.js";
import updateAnsweredStreak from "./updateAnsweredStreak.js";
const eveningRecord = async (Record, req, res) => {
  try {
    const user_id = req.user._id;
    const { data } = req.body;

    const startOfToday = getStartOfToday();
    const existingRecord = await Record.findOne({
      user_id: user_id,
      createdAt: { $gte: startOfToday },
    });

    await Record.updateOne(
      { _id: existingRecord._id },
      { $set: { data: data + existingRecord.data } }
    );

    const existingDailyRecord = await DailyTotalRecord.findOne({
      user_id: user_id,
      //food_id: existingRecord._id, //to be fixed
      createdAt: { $gte: startOfToday },
    });
    const isConserve = existingDailyRecord.data + data < 8.55;
    await DailyTotalRecord.updateOne(
      { _id: existingDailyRecord._id },
      {
        $set: {
          data: existingDailyRecord.data + data,
          isConserve: isConserve,
          counter: existingDailyRecord.counter - 1,
        },
      }
    );

    if (existingDailyRecord.counter - 1 === 0) {
      await updateAnsweredStreak(user_id);

      await updateStreak(user_id, isConserve);
      const unlockedAchievements = [];

      const firstConserve = await checkFirstConserve(isConserve, user_id);
      if (firstConserve) {
        unlockedAchievements.push(firstConserve);
      }

      const threeDaysCStreak = await threeDaysConserveStreak(user_id);
      if (threeDaysCStreak) {
        unlockedAchievements.push(threeDaysCStreak);
      }

      const sevenDaysAnswered = await sevenDaysStreakAnswered(user_id);
      if (sevenDaysAnswered) {
        unlockedAchievements.push(sevenDaysAnswered);
      }

      const sevenDaysCS = await sevenDaysConserveStreak(user_id);
      if (sevenDaysCS) {
        unlockedAchievements.push(sevenDaysCS);
      }

      const oneMonthSA = await oneMonthStreakAnswered(user_id);
      if (oneMonthSA) {
        unlockedAchievements.push(oneMonthSA);
      }
      if (existingDailyRecord.data + data < 8.55) {
        await User.updateOne(
          { _id: user_id },
          { $set: { conserveAmount: 8.55 - (existingDailyRecord.data + data) } }
        );
      }
      if (unlockedAchievements.length > 0) {
        res.status(200).json({
          message: "Evening record updated successfully",
          achievements: unlockedAchievements,
        });
        return;
      }
    }
    res.status(200).json({ message: "Evening record updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default eveningRecord;
