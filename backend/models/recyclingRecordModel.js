import mongoose from "mongoose";

const recyclingRecordSchema = mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

const RecyclingRecord = mongoose.model(
  "RecyclingRecord",
  recyclingRecordSchema
);
export default RecyclingRecord;
