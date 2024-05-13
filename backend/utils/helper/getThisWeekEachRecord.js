const getThisWeekEachRecord = async (user_id, Record) => {
  function convertUTCtoLocal(utcDate) {
    var localDate = new Date(utcDate);
    localDate.setHours(localDate.getHours() + 7); // Adjust to local time zone (+7 hours)
    return localDate;
  }

  let today = new Date(); // Get current date
  console.log(today.getDay(), today.getDate());
  let startOfCurrentWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay()
  );
  console.log(startOfCurrentWeek);
  let endOfCurrentWeek = new Date(startOfCurrentWeek);
  endOfCurrentWeek.setDate(endOfCurrentWeek.getDate() + 7);

  // Convert dates to local time zone
  startOfCurrentWeek = convertUTCtoLocal(startOfCurrentWeek);
  endOfCurrentWeek = convertUTCtoLocal(endOfCurrentWeek);
  console.log(startOfCurrentWeek, endOfCurrentWeek);
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
