import express from "express";
import protectRoute from "../middlewares/protectRoutes.js";
import electricityRecordController from "../controllers/electricityRecordController.js";

const router = express.Router();

router.post("/create", protectRoute, electricityRecordController);

export default router;
