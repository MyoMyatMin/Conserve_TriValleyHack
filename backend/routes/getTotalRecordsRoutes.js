import express from "express";
import Dummy from "../models/testDummyRow.js";
import protectRoute from "../middlewares/protectRoutes.js";
import {
  lastSevenDays,
  monthly,
  weekly,
} from "../controllers/getTotalRecordsController.js";

const router = express.Router();

router.get("/monthly", protectRoute, monthly);

router.get("/weekly", protectRoute, weekly);

router.get("/lastSevenDays", protectRoute, lastSevenDays);

export default router;
