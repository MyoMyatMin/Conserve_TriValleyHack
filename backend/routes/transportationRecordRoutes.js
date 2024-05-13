import express from "express";
import {
  morningTransportationRecord,
  noonTransportationRecord,
  eveningTransportationRecord,
  getTodayTransportationRecord,
} from "../controllers/transportationRecordController.js";
import protectRoute from "../middlewares/protectRoutes.js";

const router = express.Router();

router.post("/morning/create", protectRoute, morningTransportationRecord);
router.post("/noon/create", protectRoute, noonTransportationRecord);
router.post("/evening/create", protectRoute, eveningTransportationRecord);
router.get("/getToday", protectRoute, getTodayTransportationRecord);

export default router;
