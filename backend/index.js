import express from "express";
import { app, server } from "./socket/socket.js";
import dotenv from "dotenv";
// const app = express();
dotenv.config({});
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoutes.js";
import messageRoute from "./routes/messageRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

app.use(
  cors({
    origin: `${process.env.CLIENT_URL}`, // Frontend origin
    credentials: true, // Allow cookies and credentials
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userRoute);
app.use("/api/v1/message", messageRoute);
app.get("/", (req, res) => {
  res.send("API is running....");
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  connectDB();

  console.log(`Server is running on port ${PORT}`);
});
