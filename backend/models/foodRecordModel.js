import mongoose from "mongoose";

const foodRecordSchema = mongoose.Schema(
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

const FoodRecord = mongoose.model("FoodRecord", foodRecordSchema);
export default FoodRecord;
