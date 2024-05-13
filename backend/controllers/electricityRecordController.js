import mongoose from "mongoose";
import ElectricityRecord from "../models/electricityRecordModel.js";
const createRecord = async (req, res) => {
  const user_id = req.user._id;
  const { month, data } = req.body;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const forMonth = `${currentYear}-${String(month).padStart(2, "0")}`;
  try {
    const existingRecord = await ElectricityRecord.findOne({
      user_id,
      forMonth,
    });

    if (existingRecord) {
      return res
        .status(400)
        .json({ error: "Record already exists for this month" });
    }

    const newRecord = new ElectricityRecord({ user_id, data, forMonth });
    await newRecord.save();

    return res.status(201).json(newRecord);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default createRecord;
