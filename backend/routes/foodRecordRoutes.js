import express from "express";
import {
  morningFoodRecord,
  noonFoodRecord,
  eveningFoodRecord,
  getTodayFoodRecord,
} from "../controllers/foodRecordController.js";
import protectRoute from "../middlewares/protectRoutes.js";

const router = express.Router();

router.post("/morning/create", protectRoute, morningFoodRecord);
router.post("/noon/create", protectRoute, noonFoodRecord);
router.post("/evening/create", protectRoute, eveningFoodRecord);
router.get("/getToday", protectRoute, getTodayFoodRecord);

export default router;
