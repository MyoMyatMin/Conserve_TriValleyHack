import mongoose from "mongoose";

const transportationRecordSchema = mongoose.Schema(
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

const TransportationRecord = mongoose.model(
  "TransportationRecord",
  transportationRecordSchema
);
export default TransportationRecord;
