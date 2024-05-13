import { faker } from "@faker-js/faker";
import Dummy from "../models/testDummyRow.js";
import DailyStreak from "../models/dayStreakModel.js";
import mongoose from "mongoose";
const generateData = async () => {
  await mongoose.connection.dropCollection("dummies");
  await mongoose.connection.dropCollection("dailystreaks");
  console.log("Dummy collection dropped successfully.");

  await mongoose.connection.dropCollection("dailystreaks");
  console.log("DailyStreak collection dropped successfully.");
  const may = 4; // JavaScript months are zero-based, so May is month 4
  const year = new Date().getFullYear();

  for (let i = 1; i <= 31; i++) {
    // console.log((new Date().getTimezoneOffset() / 60) * -1);
    console.log(
      "--------------------------------------------------------------------------"
    );
    console.log(`for day ${i}`);
    const data = faker.number.int({ min: 100, max: 2000 });
    const date = new Date(year, may, i);
    const formattedDate = date.toISOString();
    let is_c = true;
    if (i === 6 || i == 8 || i === 16 || i === 31) {
      is_c = false;
    }
    const newDummy = new Dummy({
      user_id: "663a50f85ba1a76833303992",
      data: data,
      isConserve: is_c,
      createdAt: formattedDate,
      updatedAt: formattedDate, // corrected field name
    });

    try {
      const resDummy = newDummy.save();
      const yesterday = date;
      yesterday.setDate(yesterday.getDate() - 1); // Subtract 1 day from today's date

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

      console.log(yesterdayStart);
      console.log(yesterdayEnd);
      const lastStreak = await DailyStreak.find({
        updatedAt: {
          $gte: yesterdayStart,
          $lte: yesterdayEnd,
        },
      });
      console.log(lastStreak);
      if (lastStreak.length !== 0) {
        if (is_c) {
          const updatedStreak = await DailyStreak.findOneAndUpdate(
            { _id: lastStreak[0]._id },
            {
              $set: {
                streak: lastStreak[0].streak + 1,
                updatedAt: formattedDate,
              },
            },
            { new: true } // This option returns the modified document
          );

          console.log(updatedStreak);
        } else {
          console.log(is_c);
          console.log(lastStreak[0].updatedAt);
          await DailyStreak.findOneAndUpdate(
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
          isCurrent: true,
          streak: 1,
          user_id: "663a50f85ba1a76833303992",
          createdAt: formattedDate,
          updatedAt: formattedDate,
        });

        const newR = await newStreak.save();
      }
      const all = await DailyStreak.find();

      console.log(`Data for ${formattedDate} saved successfully.`);
    } catch (error) {
      console.error(`Error saving data for ${formattedDate}: ${error}`);
    }
  }
};
export default generateData;
