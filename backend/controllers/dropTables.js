import mongoose from "mongoose";
import TransportationRecord from "../models/transportationRecordModel.js";
import FoodRecord from "../models/foodRecordModel.js";
import RecyclingRecord from "../models/recyclingRecordModel.js";
import DailyTotalRecord from "../models/dailyTotalRecordModel.js";
import DailyStreak from "../models/dayStreakModel.js";

const dropTables = async () => {
  // await mongoose.connection.dropCollection("foodrecords");
  // await mongoose.connection.dropCollection("recyclingrecords");
  // await mongoose.connection.dropCollection("transportationrecords");
  // await mongoose.connection.dropCollection("dailytotalrecords");
  // await mongoose.connection.dropCollection("dailystreaks");
  await mongoose.connection.dropCollection("electricityrecords");
  //await mongoose.connection.dropCollection("dummies");
  // await mongoose.connection.dropCollection("users");

  console.log("Drop successfully");
};
const deleteRecordsByUserId = async (userId) => {
  const query = { user_id: userId };

  await FoodRecord.deleteMany(query);
  await RecyclingRecord.deleteMany(query);
  await TransportationRecord.deleteMany(query);
  await DailyTotalRecord.deleteMany(query);
  await DailyStreak.deleteMany(query);
  // await Dummy.deleteMany(query); // If you have a Dummy model
  // await User.deleteMany(query); // If you have a User model

  console.log("Documents with user_id", userId, "deleted successfully");
};

export { dropTables, deleteRecordsByUserId };
