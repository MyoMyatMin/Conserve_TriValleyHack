import mongoose from "mongoose";
import TransportationRecord from "../models/transportationRecordModel.js";
import FoodRecord from "../models/foodRecordModel.js";
import RecyclingRecord from "../models/recyclingRecordModel.js";
import DailyTotalRecord from "../models/dailyTotalRecordModel.js";

const dropTables = async () => {
  // await mongoose.connection.dropCollection("foodrecords");
  // await mongoose.connection.dropCollection("recyclingrecords");
  // await mongoose.connection.dropCollection("transportationrecords");
  // await mongoose.connection.dropCollection("dailytotalrecords");
  await mongoose.connection.dropCollection("dailystreaks");
  await mongoose.connection.dropCollection("dummies");
  // await mongoose.connection.dropCollection("users");

  console.log("Drop successfully");
};

export default dropTables;
