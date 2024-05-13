import DailyStreak from "../../models/dayStreakModel.js";
import User from "../../models/userModel.js";

const checkAchievements = async (req, res) => {};

const checkFirstConserve = async (isConserve, user_id) => {
  try {
    const user = await User.findById(user_id);
    if (isConserve && !user.achievements.includes("First Conserve")) {
      user.achievements.push("First Conserve");
      await user.save();
      return "First Conserve";
    }
    return null;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const threeDaysConserveStreak = async (user_id) => {
  try {
    const user = await User.findById(user_id);
    if (!user.achievements.includes("Three Day Streak Conserved")) {
      const streak = await DailyStreak.find({
        user_id: user_id,
        streak: { $gte: 3 },
      });
      if (streak.length > 0) {
        user.achievements.push("Three Day Streak Conserved");
        await user.save();
        return "Three Day Streak Conserved";
      }
    }
    return null;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const sevenDaysStreakAnswered = async (user_id) => {
  try {
    const user = await User.findById(user_id);
    if (!user.achievements.includes("Seven Days Streak Answered")) {
      if (user.streak >= 7) {
        user.achievements.push("Seven Days Streak Answered");
        await user.save();
        return "Seven Days Streak Answered";
      }
    }
    return null;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

const sevenDaysConserveStreak = async (user_id) => {
  try {
    const user = await User.findById(user_id);
    if (!user.achievements.includes("Seven Day Streak Conserved")) {
      const streak = await DailyStreak.find({
        user_id: user_id,
        streak: { $gte: 7 },
      });
      if (streak.length > 0) {
        user.achievements.push("Seven Day Streak Conserved");
        await user.save();
        return "Seven Day Streak Conserved";
      }
    }
    return null;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const oneMonthStreakAnswered = async (user_id) => {
  try {
    const user = await User.findById(user_id);
    if (!user.achievements.includes("One Month Streak Answered")) {
      if (user.streak >= 30) {
        user.achievements.push("One Month Streak Answered");
        await user.save();
        return "One Month Streak Answered";
      }
    }
    return null;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

export {
  checkAchievements,
  checkFirstConserve,
  threeDaysConserveStreak,
  sevenDaysStreakAnswered,
  sevenDaysConserveStreak,
  oneMonthStreakAnswered,
};
