import DailyStreak from "../../models/dayStreakModel.js";

const updateStreak = async (user_id, isConserve) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const yesterdayStart = new Date(
    yesterday.getFullYear(),
    yesterday.getMonth(),
    yesterday.getDate()
  );
  const yesterdayEnd = new Date(
    yesterday.getFullYear(),
    yesterday.getMonth(),
    yesterday.getDate(),
    23,
    59,
    59,
    999
  );

  const lastStreak = await DailyStreak.find({
    updatedAt: {
      $gte: yesterdayStart,
      $lte: yesterdayEnd,
    },
  });
  let currDate = new Date();
  currDate = currDate.toISOString();
  if (lastStreak.length !== 0) {
    if (isConserve) {
      await DailyStreak.updateOne(
        { _id: lastStreak[0]._id },
        {
          $set: {
            streak: lastStreak[0].streak + 1,
            updatedAt: currDate,
          },
        }
      );
    } else {
      await DailyStreak.updateOne(
        { _id: lastStreak[0]._id },
        {
          $set: {
            isCurrent: false,
            updatedAt: lastStreak[0].updatedAt,
          },
        }
      );
    }
  } else {
    const newStreak = new DailyStreak({
      user_id: user_id,
      isCurrent: true,
      streak: 1,
      createdAt: currDate,
      updatedAt: currDate,
    });

    await newStreak.save();
  }
};

export default updateStreak;
