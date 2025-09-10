import SurveyState from "../models/SurveyState.js";

export const ensureSurveyState = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const today = new Date().toISOString().split("T")[0];

    let surveyState = await SurveyState.findOne({
      userId,
      date: today,
    });

    if (!surveyState) {
      surveyState = new SurveyState({
        userId,
        date: today,
        surveys: {
          morning: { transportation: false, food: false, recycling: false },
          noon: { transportation: false, food: false, recycling: false },
          evening: { transportation: false, food: false, recycling: false },
        },
      });
      await surveyState.save();
    }

    req.surveyState = surveyState;
    next();
  } catch (error) {
    res.status(500).json({ error: "Failed to load survey state" });
  }
};
