import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import VedioRoute from "./routes/VedioRoute.js";
import ChannelRoute from "./routes/ChannelRoute.js";
//import "./insertData.js"; 

const app = express();

// Middleware
app.use(express.json({ limit: '5mb' }));
app.use(cors({
  origin: 'http://localhost:5173' // Allow requests from frontend
}));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/YoutubeClone")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/user", UserRoute);
app.use("/api", VedioRoute);
app.use("/api", ChannelRoute);

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
