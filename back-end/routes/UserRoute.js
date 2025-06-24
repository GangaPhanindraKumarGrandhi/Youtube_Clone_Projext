// userRoutes.js
import express from "express";
import { register, login, logout } from "../controller/UserController.js";
import protection from "../middleware/UserAuth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login); // No auth required
router.post("/logout", protection, logout);

// ✅ Protected profile route
router.get("/profile", protection, (req, res) => {
  const { Email, UserName } = req.user;
  res.json({
    message: "Authorized access",
    user: { Email, UserName }
  });
});

export default router;
