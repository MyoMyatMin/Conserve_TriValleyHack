import mongoose from "mongoose";

const dailyTotalRecordSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // food_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "FoodRecord",
    // },
    // transportation_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "TransportationRecord",
    // },
    // recycling_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "RecyclingRecord",
    // },
    // fix later (optional)

    data: {
      type: Number,
      required: true,
    },
    isConserve: {
      type: Boolean,
      default: false,
    },
    counter: {
      type: Number,
      default: 8,
    },
  },
  {
    timestamps: true,
  }
);

const DailyTotalRecord = mongoose.model(
  "DailyTotalRecord",
  dailyTotalRecordSchema
);
export default DailyTotalRecord;
