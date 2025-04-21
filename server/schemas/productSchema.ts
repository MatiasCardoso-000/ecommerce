import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: String,
  },
  image: {
    type: String,
  },
  rating: {
    type: String,
  },
});

export default mongoose.model("Product", productSchema);
