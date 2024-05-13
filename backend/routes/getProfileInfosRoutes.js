import express from "express";
import {
  getProfileInfos,
  getAchievements,
} from "../controllers/getProfileInfosController.js";
import protectRoute from "../middlewares/protectRoutes.js";
const router = express();

router.get("/", protectRoute, getProfileInfos);
router.get("/achievements", protectRoute, getAchievements);

export default router;
