import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
const protectRoute = async (req, res, next) => {
  try {
    let token;
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized." });
      }

      token = authHeader.split(" ")[1];
      token = token.replace(/^"|"$/g, "");
    }

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
