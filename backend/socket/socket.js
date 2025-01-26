import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
// Create an HTTP server from the Express app

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: `${process.env.CLIENT_URL}`,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};
const userSocketMap = {};
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  const userId = socket.handshake.query.userId;
  if (userId !== undefined) {
    userSocketMap[userId] = socket.id;
  }
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    if (userId in userSocketMap) {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });
});

export { server, io, app };
