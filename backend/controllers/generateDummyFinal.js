import { faker } from "@faker-js/faker";
import Dummy from "../models/testDummyRow.js";
import DailyStreak from "../models/dayStreakModel.js";
import mongoose from "mongoose";
import FoodRecord from "../models/foodRecordModel.js";
import TransportationRecord from "../models/transportationRecordModel.js";
import RecyclingRecord from "../models/recyclingRecordModel.js";
import DailyTotalRecord from "../models/dailyTotalRecordModel.js";
import updateAnsweredStreak from "../utils/helper/updateAnsweredStreak.js";
import User from "../models/userModel.js";

import {
  checkFirstConserve,
  oneMonthStreakAnswered,
  sevenDaysConserveStreak,
  sevenDaysStreakAnswered,
  threeDaysConserveStreak,
} from "../utils/helper/checkAchievements.js";

const generateDummyFinal = async () => {
  const startDate = new Date(2023, 4, 30); // May is month 4 (zero-based indexing)
  const endDate = new Date(2024, 4, 28); // May is month 4 (zero-based indexing)
  //const user_id = "664216f602e3f37efbfc5023";
  //const user_id = "664d9ad72037ed7c1238c526";
  const user_id = "6656cb27e0ecde2b599a4e20";
  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    const formattedDate = date.toISOString();

    const rData = faker.number.float({ min: 0, max: 0.07, fractionDigits: 2 });
    const tData = faker.number.float({ min: 0, max: 7, fractionDigits: 2 });
    const fData = faker.number.float({ min: 0, max: 5, fractionDigits: 2 });

    const is_c = rData + tData + fData < 8.55;

    const newF = new FoodRecord({
      user_id: user_id,
      data: fData,
      createdAt: formattedDate,
      updatedAt: formattedDate,
    });
    await newF.save();

    const newR = new RecyclingRecord({
      user_id: user_id,
      data: rData,
      createdAt: formattedDate,
      updatedAt: formattedDate,
    });
    await newR.save();

    const newT = new TransportationRecord({
      user_id: user_id,
      data: tData,
      createdAt: formattedDate,
      updatedAt: formattedDate,
    });
    await newT.save();

    const newTotalRecord = new DailyTotalRecord({
      user_id: user_id,
      data: rData + tData + fData,
      isConserve: is_c,
      createdAt: formattedDate,
      updatedAt: formattedDate,
    });

    try {
      await newTotalRecord.save();

      const yesterday = new Date(date);
      yesterday.setDate(yesterday.getDate() - 1);

      const yesterdayStart = new Date(yesterday);
      yesterdayStart.setHours(0, 0, 0, 0);
      const yesterdayEnd = new Date(yesterday);
      yesterdayEnd.setHours(23, 59, 59, 999);

      const lastStreak = await DailyStreak.find({
        updatedAt: {
          $gte: yesterdayStart,
          $lte: yesterdayEnd,
        },
        user_id: user_id,
      });

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
            { new: true }
          );
        } else {
          await DailyStreak.findOneAndUpdate(
            { _id: lastStreak[0]._id },
            {
              $set: {
                isCurrent: false,
              },
            }
          );
        }
      } else {
        const newStreak = new DailyStreak({
          isCurrent: true,
          streak: 1,
          user_id: user_id,
          createdAt: formattedDate,
          updatedAt: formattedDate,
        });
        await newStreak.save();
      }

      await updateAnsweredStreak(user_id);

      const unlockedAchievements = [];
      const firstConserve = await checkFirstConserve(is_c, user_id);
      if (firstConserve) {
        unlockedAchievements.push(firstConserve);
      }

      const threeDaysCStreak = await threeDaysConserveStreak(user_id);
      if (threeDaysCStreak) {
        unlockedAchievements.push(threeDaysCStreak);
      }

      const sevenDaysAnswered = await sevenDaysStreakAnswered(user_id);
      if (sevenDaysAnswered) {
        unlockedAchievements.push(sevenDaysAnswered);
      }

      const sevenDaysCS = await sevenDaysConserveStreak(user_id);
      if (sevenDaysCS) {
        unlockedAchievements.push(sevenDaysCS);
      }

      const oneMonthSA = await oneMonthStreakAnswered(user_id);
      if (oneMonthSA) {
        unlockedAchievements.push(oneMonthSA);
      }

      if (is_c) {
        const user = await User.findOne({ _id: user_id });
        const existingConserveAmount = user.conserveAmount || 0; // Default to 0 if conserveAmount doesn't exist

        const newConserveAmount =
          8.55 - (rData + tData + fData) + existingConserveAmount;
        console.log(newConserveAmount);

        await User.updateOne(
          { _id: user_id },
          { $set: { conserveAmount: newConserveAmount } }
        );
      }

      console.log(`Data for ${formattedDate} saved successfully.`);
    } catch (error) {
      console.error(`Error saving data for ${formattedDate}: ${error}`);
    }
  }
};

export default generateDummyFinal;
