import mongoose from "mongoose";
import { MONGO_URI } from "./config/config";



export const connectDB = () => {
  mongoose
    .connect(MONGO_URI, { dbName: "products_data_base" })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};
