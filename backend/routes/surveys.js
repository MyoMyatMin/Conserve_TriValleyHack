import express from "express";
import SurveyState from "../models/SurveyState.js";
import { ensureSurveyState } from "../middlewares/surveyState.js";
import auth from "../middlewares/protectRoutes.js";

const router = express.Router();

// Get today's survey flags
router.get("/today/status", auth, ensureSurveyState, async (req, res) => {
  try {
    const { surveyState } = req;
    res.json({
      date: surveyState.date,
      surveys: surveyState.surveys,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch survey status" });
  }
});

// Mark a category complete (idempotent)
router.post("/markComplete", auth, ensureSurveyState, async (req, res) => {
  try {
    const { surveyType, category } = req.body;
    const { surveyState } = req;

    if (!["morning", "noon", "evening"].includes(surveyType)) {
      return res.status(400).json({ error: "Invalid survey type" });
    }
    if (!["transportation", "food", "recycling"].includes(category)) {
      return res.status(400).json({ error: "Invalid category" });
    }

    surveyState.surveys[surveyType][category] = true;
    await surveyState.save();

    res.json({ message: "Marked complete" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update survey status" });
  }
});

export default router;
