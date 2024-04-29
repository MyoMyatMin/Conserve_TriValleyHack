import express from "express";
import { getSomething, signIn } from "../controllers/userController.js";
const router = express.Router();

router.get("/", getSomething);
router.post("/signin", signIn);

export default router;
