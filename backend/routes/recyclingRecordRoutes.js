import express from "express";
import {
  morningRecyclingRecord,
  noonRecyclingRecord,
  eveningRecyclingRecord,
  getTodayRecyclingRecord,
} from "../controllers/recyclingRecordController.js";
import protectRoute from "../middlewares/protectRoutes.js";

const router = express.Router();

router.post("/morning/create", protectRoute, morningRecyclingRecord);
router.post("/noon/create", protectRoute, noonRecyclingRecord);
router.post("/evening/create", protectRoute, eveningRecyclingRecord);
router.get("/getToday", protectRoute, getTodayRecyclingRecord);

export default router;
