import mongoose from "mongoose";
import ElectricityRecord from "../models/electricityRecordModel.js"; // Assuming this is the file where you've defined your schema

// Connect to MongoDB

// Function to save electricity records for a year
async function electricityDummy(userId, yearData) {
  try {
    // Iterate over the yearData array
    for (const monthData of yearData) {
      // Create a new ElectricityRecord instance
      const record = new ElectricityRecord({
        user_id: userId,
        data: monthData.data,
        forMonth: monthData.forMonth,
      });

      // Save the record to the database
      await record.save();
      console.log(`Saved record for ${monthData.forMonth}`);
    }
    console.log("All records saved successfully!");
  } catch (error) {
    console.error("Error saving records:", error);
  }
}

// Example usage
const yearData = [
  { data: 115, forMonth: "2023-06" },
  { data: 125, forMonth: "2023-07" },
  { data: 110, forMonth: "2023-08" },
  { data: 130, forMonth: "2023-09" },
  { data: 115, forMonth: "2023-10" },
  { data: 120, forMonth: "2023-11" },
  { data: 122, forMonth: "2023-12" },
  { data: 118, forMonth: "2024-01" },
  { data: 124, forMonth: "2024-02" },
  { data: 121, forMonth: "2024-03" },
  { data: 119, forMonth: "2024-04" },
  { data: 123, forMonth: "2024-05" },
];

const userId = "664216f602e3f37efbfc5023"; // Replace with actual user ID

export default electricityDummy;
