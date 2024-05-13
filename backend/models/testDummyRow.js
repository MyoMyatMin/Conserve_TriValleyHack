import mongoose from "mongoose";

const dummySchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    data: {
      type: Number,
      required: true,
    },
    isConserve: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Dummy = mongoose.model("Dummy", dummySchema);
export default Dummy;
