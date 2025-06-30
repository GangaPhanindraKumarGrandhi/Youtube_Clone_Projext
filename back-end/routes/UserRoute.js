import express from "express";
import { register, login, logout } from "../controller/UserController.js";
import protection from "../middleware/UserAuth.js";

const router = express.Router();

// Register a new user
router.post("/register", register);

// Login route (no authentication needed)
router.post("/login", login);

// Logout route (requires authentication)
router.post("/logout", protection, logout);

// Protected route to get user profile
router.get("/profile", protection, (req, res) => {
  const { Email, UserName } = req.user;
  res.json({
    message: "Authorized access",
    user: { Email, UserName }
  });
});

export default router;
