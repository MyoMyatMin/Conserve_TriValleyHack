import DailyTotalRecord from "../../models/dailyTotalRecordModel.js";
import { getStartOfToday } from "./getStartOfToday.js";
const noonRecord = async (Record, req, res) => {
  try {
    const user_id = req.user._id;
    const { data } = req.body;
    console.log(data);

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
      ///  food_id: existingRecord._id, //to be fixed
      user_id: user_id,
      createdAt: { $gte: startOfToday },
    });
    console.log(existingDailyRecord.data, "hi");
    const isConserve = existingDailyRecord.data + data < 1000;

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
    res.status(200).json({ message: "Noon record updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default noonRecord;
