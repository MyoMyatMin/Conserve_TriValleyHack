import DailyTotalRecord from "../../models/dailyTotalRecordModel.js";
import { getStartOfToday } from "./getStartOfToday.js";

const morningRecord = async (Record, req, res) => {
  try {
    const user_id = req.user._id;
    const { data } = req.body;
    const newRecord = new Record({
      user_id: user_id,
      data: data,
    });
    const resultRecord = await newRecord.save();
    const startOfToday = getStartOfToday();
    const existingDailyRecord = await DailyTotalRecord.findOne({
      user_id: user_id,
      createdAt: { $gte: startOfToday },
    });
    if (existingDailyRecord) {
      const isConserve = existingDailyRecord.data + data < 8.55;
      await DailyTotalRecord.updateOne(
        { _id: existingDailyRecord._id },
        {
          $set: {
            // food_id: resultRecord._id, //to fix later
            data: existingDailyRecord.data + data,
            isConserve: isConserve,
            counter: existingDailyRecord.counter - 1,
          },
        }
      );
    } else {
      const newTotalRecord = new DailyTotalRecord({
        user_id: user_id,
        data: resultRecord.data,
        isConserve: resultRecord.data < 8.55,
        //food_id: resultRecord._id,
      });
      await newTotalRecord.save();
    }
    res.status(201).json({ message: "Morning record created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default morningRecord;
