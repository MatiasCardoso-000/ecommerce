import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/products";

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
