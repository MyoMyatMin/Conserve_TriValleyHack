import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./db/connectDB.js";
import foodRecordRoutes from "./routes/foodRecordRoutes.js";
import trasportationRecordRoutes from "./routes/transportationRecordRoutes.js";
import recyclingRecordRoutes from "./routes/recyclingRecordRoutes.js";
import generateData from "./controllers/generateData.js";
import generateDataForStreak from "./controllers/generateDataForStreak.js";
import dummyRoutes from "./routes/dummyRoutes.js";
import { dropTables, deleteRecordsByUserId } from "./controllers/dropTables.js";
import getTotalRecordsRoutes from "./routes/getTotalRecordsRoutes.js";
import { v2 as cloudinary } from "cloudinary";
import getProfileInfosRoutes from "./routes/getProfileInfosRoutes.js";
import electricityRecordRoutes from "./routes/electricityRecordRoutes.js";
import generateDummyFinal from "./controllers/generateDummyFinal.js";
import electricityDummy from "./controllers/electricityDummy.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/food", foodRecordRoutes);
app.use("/api/transportation", trasportationRecordRoutes);
app.use("/api/recycling", recyclingRecordRoutes);
app.use("/api/electricity", electricityRecordRoutes);
app.use("/api/dummy", dummyRoutes);
app.use("/api/getTotalRecord", getTotalRecordsRoutes);
app.use("/api/getProfileInfos", getProfileInfosRoutes);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
  // generateDummyFinal();
  // dropTables();
  // deleteRecordsByUserId("664d9ad72037ed7c1238c526");
  // const yearData = [
  //   { data: 115, forMonth: "2023-06" },
  //   { data: 125, forMonth: "2023-07" },
  //   { data: 110, forMonth: "2023-08" },
  //   { data: 101, forMonth: "2023-09" },
  //   { data: 115, forMonth: "2023-10" },
  //   { data: 129, forMonth: "2023-11" },
  //   { data: 130, forMonth: "2023-12" },
  //   { data: 118, forMonth: "2024-01" },
  //   { data: 124, forMonth: "2024-02" },
  //   { data: 121, forMonth: "2024-03" },
  //   { data: 119, forMonth: "2024-04" },
  //   { data: 108, forMonth: "2024-05" },
  // ];

  // const userId = "664216f602e3f37efbfc5023"; // Replace with actual user ID
  // //const userId = "664d9ad72037ed7c1238c526";
  // electricityDummy(userId, yearData);
  // generateDummyFinal();
  // // generateData();

  //generateDataForStreak();
});
