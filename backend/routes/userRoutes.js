import express from "express";
import {
  getSomething,
  signIn,
  signup,
  updateUser,
} from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoutes.js";
const router = express.Router();

router.get("/", protectRoute, getSomething);
router.post("/signin", signIn);
router.post("/signup", signup);
router.put("/update/:id", protectRoute, updateUser);

export default router;
