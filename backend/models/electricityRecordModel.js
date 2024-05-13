import mongoose from "mongoose";

const electricityRecordSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    data: {
      type: Number,
      required: true,
    },
    forMonth: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ElectricityRecord = mongoose.model(
  "ElectricityRecord",
  electricityRecordSchema
);
export default ElectricityRecord;
