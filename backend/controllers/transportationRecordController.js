import transportationRecord from "../models/transportationRecordModel.js";
import DailyTotalRecord from "../models/dailyTotalRecordModel.js";
import morningRecord from "../utils/helper/morningRecord.js";
import noonRecord from "../utils/helper/noonRecord.js";
import eveningRecord from "../utils/helper/eveningRecord.js";

const getTodayTransportationRecord = async (req, res) => {
  try {
    const user_id = req.user._id;

    const today = new Date();
    console.log(today);
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    console.log(startOfToday.toString());
    const todayRecord = await transportationRecord.findOne({
      user_id: user_id,
      createdAt: { $gte: startOfToday },
    });

    let responseData = todayRecord ? todayRecord.data : 0;

    res.status(200).json({ data: responseData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const morningTransportationRecord = async (req, res) => {
  await morningRecord(transportationRecord, req, res);
};

const noonTransportationRecord = async (req, res) => {
  await noonRecord(transportationRecord, req, res);
};

const eveningTransportationRecord = async (req, res) => {
  await eveningRecord(transportationRecord, req, res);
};

export {
  getTodayTransportationRecord,
  morningTransportationRecord,
  noonTransportationRecord,
  eveningTransportationRecord,
};
