import mongoose from "mongoose";
import User from "../models/userModel.js"; // Update this import path
import DailyStreak from "../models/dayStreakModel.js"; // Update this import path

const getProfileInfos = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user ID is available in request object

    // Fetching highest streak
    const highestStreak = await DailyStreak.aggregate([
      {
        $match: {
          user_id: userId,
        },
      },
      {
        $group: {
          _id: "$user_id",
          highestStreak: { $max: "$streak" },
        },
      },
    ]);

    // Fetching current streak
    const currentStreakData = await DailyStreak.findOne({
      user_id: userId,
      isCurrent: true,
    }).sort({ createdAt: -1 });

    const currentStreak = currentStreakData ? currentStreakData.streak : 0;

    // Fetching user's account age
    const user = await User.findById(userId);
    const accountAgeMilliseconds = Date.now() - user.createdAt;
    const accountAgeInDays =
      Math.floor(accountAgeMilliseconds / (1000 * 60 * 60 * 24)) + 1;

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      achievements: user.achievements.length,
      highestStreak: highestStreak.length ? highestStreak[0].highestStreak : 0,
      currentStreak,
      accountAgeInDays,
    });
  } catch (err) {
    console.error("Error fetching profile info:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAchievements = async (req, res) => {
  try {
    const user_id = req.user._id;
    const user = await User.findById(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { achievements, conserveAmount } = user;

    res.status(200).json({ achievements, conserveAmount });
  } catch (error) {
    console.error("Error getting achievements and conserveAmount:", error);
    res.status(500).json({ message: error.message });
  }
};

export { getProfileInfos, getAchievements };
