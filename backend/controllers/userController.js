import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helper/generateTokenAndSetCookie.js";
import { v2 as cloudinary } from "cloudinary";

const getSomething = async (req, res) => {
  const user = req.user;

  res.status(200).json(user);
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password." });
    }
    const token = generateTokenAndSetCookie(user._id, res);

    res.status(201).json({
      _id: user._id,
      email: user.email,
      username: user.username,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) {
      return res.status(400).json({ error: "User already exists." });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    if (newUser) {
      const token = generateTokenAndSetCookie(newUser._id, res);
      if (!newUser.achievements.includes("First Login")) {
        newUser.achievements.push("First Login");
        await newUser.save();
      }
      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        token: token,
        achievements: newUser.achievements,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in signupUser", error.message);
  }
};

const updateUser = async (req, res) => {
  const { username, email, password } = req.body;

  let { profilePic } = req.body;

  const userId = req.user._id;
  try {
    let user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: "User not found." });

    if (req.params.id !== userId.toString()) {
      return res
        .status(400)
        .json({ error: "You cannot update other user's profile." });
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    if (profilePic) {
      if (user.profilePic) {
        await cloudinary.uploader.destroy(
          user.profilePic.split("/").pop().split(".")[0]
        );
      }
      const uploadedResponse = await cloudinary.uploader.upload(profilePic);
      profilePic = uploadedResponse.secure_url;
    }

    user.email = email || user.email;
    user.username = username || user.username;
    user.profilePic = profilePic || user.profilePic;

    user = await user.save();
    user.password = null;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in updateUser");
  }
};
export { getSomething, signIn, signup, updateUser };
