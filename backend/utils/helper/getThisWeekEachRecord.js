import getISOWeeks from "./getISOWeeks.js";

const getThisWeekEachRecord = async (user_id, Record) => {
  let { startOfCurrentWeek, endOfCurrentWeek } = getISOWeeks();

  // Convert dates to local time zone

  const result = await Record.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startOfCurrentWeek,
          $lt: endOfCurrentWeek,
        },
        user_id: user_id,
      },
    },
    {
      $addFields: {
        localCreatedAt: {
          $dateAdd: {
            startDate: "$createdAt",
            unit: "hour",
            amount: 7,
          },
        },
      },
    },
    {
      $group: {
        _id: { $isoWeek: "$createdAt" }, // Group by ISO week
        totalData: { $sum: "$data" },
      },
    },
    {
      $project: {
        _id: 0, // Exclude the _id field
        totalData: 1, // Include the totalData field
      },
    },
    {
      $sort: {
        _id: -1,
      },
    },
  ]);
  if (result.length === 0) {
    return 0;
  }
  return result[0].totalData;
};
export default getThisWeekEachRecord;
