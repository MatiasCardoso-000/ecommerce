import mongoose from "mongoose";
import { MONGO_URI, dbName } from "./config/config.js";

export const connectDB = () => {
  mongoose
    .connect(MONGO_URI, { dbName })
    .then(async () => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};
