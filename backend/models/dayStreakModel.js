import mongoose from "mongoose";

const dayStreakSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  streak: {
    type: Number,
    required: true,
  },
  isCurrent: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    required: true,
  },

  updatedAt: {
    type: Date,
    required: true,
  },
});

const DailyStreak = mongoose.model("DailyStreak", dayStreakSchema);
export default DailyStreak;
