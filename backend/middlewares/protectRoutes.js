import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token." });
    }

    const user = await User.findById(decoded.userID).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in protectRoute", error.message);
  }
};

export default protectRoute;
