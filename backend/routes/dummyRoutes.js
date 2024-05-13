import express from "express";
import Dummy from "../models/testDummyRow.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await Dummy.aggregate([
      // {
      //   $addFields: {
      //     localCreatedAt: {
      //       $dateToString: {
      //         format: "%Y-%m-%d",
      //         timezone: "Asia/Bangkok", // Adjust timezone to your local timezone
      //         date: "$createdAt",
      //       },
      //     },
      //   },
      // },
      // {
      //   $group: {
      //     _id: { $substr: ["$localCreatedAt", 0, 7] }, // Group by month in local timezone
      //     totalData: { $sum: "$data" }, // Calculate total data for each month
      //   },
      // },

      // $group: {
      //   _id: { $month: "$createdAt" }, // Group by week
      //   totalData: { $sum: "$data" }, // Calculate total data for each week
      // },
      {
        $addFields: {
          localCreatedAt: {
            $dateToString: {
              format: "%Y-%m-%d", // Format to Year-Week
              timezone: "Asia/Bangkok",
              date: "$createdAt",
            },
          },
        },
      },
      {
        $group: {
          _id: { $isoWeek: "$createdAt" }, // Group by week
          totalData: { $sum: "$data" }, // Calculate total data for each week
        },
      },
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
