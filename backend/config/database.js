import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect(
      `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.k2vouiz.mongodb.net/chat`
    )
    .then(() => {
      console.log("Connected to MongoDB Atlas!");
    })
    .catch(() => console.log("Error connecting to MongoDB Atlas"));
};
export default connectDB;
