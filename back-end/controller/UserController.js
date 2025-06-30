import User from "../models/UserData_model.js";
import Logged from "../models/Logged_Model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Password validation function
const isValidPassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return regex.test(password);
};

// Register a new user
export async function register(req, res) {
  try {
    const { UserId, UserName, Email, Password, avtar, channels } = req.body;

    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!isValidPassword(Password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters, contain uppercase, lowercase, digit, and a special character (!@#$%^&*).",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Create new user
    const newUser = await User.create({
      UserId,
      UserName,
      Email,
      Password: hashedPassword,
      avtar,
      channels,
    });

    res.status(201).json({ message: "User Registered", user: newUser });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}

// User login
export async function login(req, res) {
  try {
    const { Email, Password } = req.body;

    const user = await User.findOne({ Email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare entered password with hashed password
    const isPasswordMatch = await bcrypt.compare(Password, user.Password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { Email: user.Email, UserName: user.UserName },
      "Youtube", // Use environment variable in production
      { expiresIn: "1d" }
    );

    await Logged.create({ Email: user.Email, Username: user.UserName });

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
}

// User logout
export async function logout(req, res) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, "Youtube");

    const result = await Logged.deleteOne({ Email: decoded.Email });

    res.json({ message: "User logged out", removed: result.deletedCount });
  } catch (err) {
    console.error("Logout Error:", err);
    res.status(500).json({ message: "Logout failed", error: err.message });
  }
}
