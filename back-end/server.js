import express from "express";
import mongoose from "mongoose";
import UserRoute from "./routes/UserRoute.js";
import VedioRoute from "./routes/VedioRoute.js"
import ChannelRoute from "./routes/ChannelRoute.js";
import cors from "cors"
import "./insertData.js";



const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'  // frontend URL
}));

mongoose.connect("mongodb://localhost:27017/YoutubeClone")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use("/api/user", UserRoute); // base route
app.use("/api",VedioRoute)
app.use("/api", ChannelRoute);


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
