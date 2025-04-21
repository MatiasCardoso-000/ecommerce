import { Router } from "express";
import Product from "../schemas/productSchema";
import { type Request, type Response } from "express";

export const router = Router();

router.get("/products", async (req: Request, res: Response) => {
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

router.post("/products", async (req: Request, res: Response) => {
  const { title, description, price, category, image, rating } = req.body;

  if (!title || !description || !price || !category || !image || !rating) {
    throw new Error("Title, description,price and category are required.");
  }

  try {
    const newProduct = await Product.create({
      title,
      description,
      price,
      category,
      image,
      rating,
    });

    res.json(newProduct);
    console.log("producto creado: ", newProduct);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});
