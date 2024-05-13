import Dummy from "../models/testDummyRow.js";
import mongoose from "mongoose";

const generateData = async () => {
  await mongoose.connection.dropCollection("dummies");
  const year = new Date().getFullYear();

  // Loop through all months of the year

  const startDate = new Date(2023, 4, 12); // May is month 4 (zero-based indexing)
  const endDate = new Date(2024, 4, 13); // May is month 4 (zero-based indexing)
  console.log(endDate);

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    // const data = faker.number.int({ min: 100, max: 2000 });
    const data = date.getMonth() + 1;

    const formattedDate = date.toISOString();
    let is_c = false;

    console.log(is_c, data);
    const newDummy = new Dummy({
      user_id: "663a50f85ba1a76833303992",
      data: date.getMonth() + 1,
      isConserve: is_c,
      createdAt: formattedDate,
      updatedAt: formattedDate, // corrected field name
    });

    try {
      await newDummy.save();
      console.log(`Data for ${formattedDate} saved successfully.`);
    } catch (error) {
      console.error(`Error saving data for ${formattedDate}: ${error}`);
    }
  }
};

export default generateData;
