import { Router } from "express";
import Product from "../models/product.model.js";

export const router = Router();

router.get("/products", async (req, res) => {
  const products = await Product.find();

  res.json(products);
});

// router.get("/products/:id", (req, res) => {
//   const { id } = req.params;
//   const productId = products.products.findIndex(
//     (product) => product.id === Number(id)
//   );
//   if (productId === -1) {
//     res.status(404).json({ error: "Product not found" });
//   }
//   res.json(products.products[productId]);
// });

router.post("/products", async (req, res) => {
  const { title, description, price, category, image } = req.body;

  if (!title || !description || !price || !category || !image) {
    throw new Error("Title, description,price and category are required.");
  }

  try {
    const newProduct = await Product.create({
      title,
      description,
      price,
      category,
      image,
    });

    res.json(newProduct);
    console.log("producto creado: ", newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
