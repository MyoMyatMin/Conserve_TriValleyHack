const getThisMonthEachRecord = async (user_id, Record) => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const result = await Record.aggregate([
    {
      $match: {
        user_id: user_id,
        createdAt: {
          $gte: startOfMonth,
          $lte: endOfMonth,
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
    {
      $limit: 1,
    },
  ]);
  return result[0].totalData;
};

export default getThisMonthEachRecord;
