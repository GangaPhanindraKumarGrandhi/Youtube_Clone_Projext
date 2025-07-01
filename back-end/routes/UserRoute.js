import express from "express";
import { register, login, logout } from "../controller/UserController.js";
import protection from "../middleware/UserAuth.js";
import User from "../models/UserData_model.js"

const router = express.Router();

// Register a new user
router.post("/register", register);

// Login route (no authentication needed)
router.post("/login", login);

// Logout route (requires authentication)
router.post("/logout", protection, logout);



// Protected route to get user profile
router.get("/profile", protection, async (req, res) => {
  try {
    // Extract email from decoded token
    const { Email } = req.user;

    // Fetch fresh user data from DB
    const user = await User.findOne({ Email }).select("-Password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Authorized access",
      user, // returns latest data: UserName, Email, Avatar, etc.
    });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


export default router;
