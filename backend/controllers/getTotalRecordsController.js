import DailyTotalRecord from "../models/dailyTotalRecordModel.js";
import Dummy from "../models/testDummyRow.js";
import getTodayEachRecord from "../utils/helper/getTodayEachRecord.js";
import FoodRecord from "../models/foodRecordModel.js";
import TransportationRecord from "../models/transportationRecordModel.js";
import RecyclingRecord from "../models/recyclingRecordModel.js";
import getThisWeekEachRecord from "../utils/helper/getThisWeekEachRecord.js";
import getThisMonthEachRecord from "../utils/helper/getThisMonthEachRecord.js";
import ElectricityRecord from "../models/electricityRecordModel.js";
import getThisMonthElectricity from "../utils/helper/getThisMonthElectricity.js";

const monthly = async (req, res) => {
  try {
    const user_id = req.user._id;
    const twelveMonthsAgo = await DailyTotalRecord.aggregate([
      {
        $match: {
          user_id: user_id,
          createdAt: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - 11)), // 12 months ago
            $lte: new Date(), // Current date
          },
        },
      },
      {
        $addFields: {
          localCreatedAt: {
            $dateToString: {
              format: "%Y-%m-%d",
              timezone: "Asia/Bangkok", // Adjust timezone to your local timezone
              date: "$createdAt",
            },
          },
        },
      },
      {
        $group: {
          _id: { $substr: ["$localCreatedAt", 0, 7] }, // Group by month in local timezone
          totalData: { $sum: "$data" }, // Calculate total data for each month
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
    ]);

    const electricityData = await ElectricityRecord.aggregate([
      {
        $match: {
          user_id: user_id,
          forMonth: { $in: twelveMonthsAgo.map((item) => item._id) },
        },
      },
      {
        $group: {
          _id: "$forMonth",
          totalData: { $sum: "$data" },
        },
      },
    ]);

    twelveMonthsAgo.forEach((month) => {
      const electricityRecord = electricityData.find(
        (record) => record._id === month._id
      );
      if (electricityRecord) {
        month.totalData += electricityRecord.totalData;
      }
    });

    twelveMonthsAgo.sort((a, b) => new Date(b._id) - new Date(a._id));

    const thismonthFood = await getThisMonthEachRecord(user_id, FoodRecord);
    const thismonthTransport = await getThisMonthEachRecord(
      user_id,
      TransportationRecord
    );
    const thismonthRecycle = await getThisMonthEachRecord(
      user_id,
      RecyclingRecord
    );
    const thismonthTotal = await getThisMonthEachRecord(
      user_id,
      DailyTotalRecord
    );

    const thisMonthElectricity = await getThisMonthElectricity(
      user_id,
      ElectricityRecord
    );
    const result = [
      { thismonthFood: thismonthFood },
      {
        thismonthTransport: thismonthTransport,
      },
      {
        thismonthRecycle: thismonthRecycle,
      },
      {
        thisMonthElectricity: thisMonthElectricity,
      },
      { thismonthTotal: thismonthTotal },
      { twelveMonthsAgo: twelveMonthsAgo },
    ];
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const weekly = async (req, res) => {
  const user_id = req.user._id;
  function convertUTCtoLocal(utcDate) {
    var localDate = new Date(utcDate);
    localDate.setHours(localDate.getHours() + 7); // Adjust to local time zone (+7 hours)
    return localDate;
  }

  let today = new Date(); // Get current date

  let startOfCurrentWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay()
  );
  let endOfCurrentWeek = new Date(startOfCurrentWeek);
  endOfCurrentWeek.setDate(endOfCurrentWeek.getDate() + 7); // End of current week

  let startOfFourWeeksAgo = new Date(startOfCurrentWeek);
  startOfFourWeeksAgo.setDate(startOfFourWeeksAgo.getDate() - 28); // Start of four weeks ago

  // Convert dates to local time zone
  startOfCurrentWeek = convertUTCtoLocal(startOfCurrentWeek);
  endOfCurrentWeek = convertUTCtoLocal(endOfCurrentWeek);
  startOfFourWeeksAgo = convertUTCtoLocal(startOfFourWeeksAgo);

  try {
    const fourWeeksAgo = await DailyTotalRecord.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfFourWeeksAgo,
            $lt: endOfCurrentWeek,
          },
          user_id: user_id,
        },
      },

      {
        $group: {
          _id: {
            $isoWeek: {
              date: "$createdAt",
              timezone: "Asia/Bangkok",
            },
          },
          totalData: { $sum: "$data" },
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
    ]);
    const thisWeekFood = await getThisWeekEachRecord(user_id, FoodRecord);
    const thisWeekTransport = await getThisWeekEachRecord(
      user_id,
      TransportationRecord
    );
    const thisWeekRecycle = await getThisWeekEachRecord(
      user_id,
      RecyclingRecord
    );

    const thisWeekTotal = await getThisWeekEachRecord(
      user_id,
      DailyTotalRecord
    );
    const result = [
      { thisWeekFood: thisWeekFood },
      { thisWeekTransport: thisWeekTransport },
      { thisWeekRecycle: thisWeekRecycle },
      { thisWeekTotal: thisWeekTotal },
      { fourWeeksAgo: fourWeeksAgo },
    ];
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const lastSevenDays = async (req, res) => {
  try {
    const user_id = req.user._id;

    const todayFood = await getTodayEachRecord(user_id, FoodRecord);
    const todayTransport = await getTodayEachRecord(
      user_id,
      TransportationRecord
    );
    const todayRecycle = await getTodayEachRecord(user_id, RecyclingRecord);
    const todayTotal = await getTodayEachRecord(user_id, DailyTotalRecord);
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7); // Calculate date 7 days ago
    const recordsWithinLastSevenDays = await DailyTotalRecord.find({
      user_id: user_id,
      createdAt: { $gte: sevenDaysAgo, $lte: today },
    })
      .sort({ createdAt: 1 })
      .select({ _id: 0, data: 1 });

    const result = [
      { todayFood: todayFood },
      { todayTransport: todayTransport },
      { todayRecycle: todayRecycle },
      { todayTotal: todayTotal },
      { recordsWithinLastSevenDays: recordsWithinLastSevenDays },
    ];
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { monthly, weekly, lastSevenDays };
