import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    transportation: { type: Boolean, default: false },
    food: { type: Boolean, default: false },
    recycling: { type: Boolean, default: false },
  },
  { _id: false }
);

const surveyStateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: String, required: true },
    surveys: {
      morning: { type: categorySchema, default: () => ({}) },
      noon: { type: categorySchema, default: () => ({}) },
      evening: { type: categorySchema, default: () => ({}) },
    },
  },
  { timestamps: true }
);

surveyStateSchema.index({ userId: 1, date: 1 }, { unique: true });

const SurveyState = mongoose.model("SurveyState", surveyStateSchema);
export default SurveyState;
