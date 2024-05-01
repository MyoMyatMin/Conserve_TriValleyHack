import express from "express";
import { getSomething, signIn, signUp } from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoutes.js";
const router = express.Router();

router.get("/", protectRoute, getSomething);
router.post("/signin", signIn);
router.post("/signup", signUp);

export default router;
