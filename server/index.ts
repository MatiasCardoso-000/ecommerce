import express from "express";
import { Router } from "express";
import products from "./products.json";
import cors from "cors";

const app = express();
const router = Router();

app.use(express.json());
app.use(cors());

router.get("/products", (req, res) => {
  try {
    if (!products) {
      throw new Error("No products found");
    }
    res.json(products);
  } catch (error:any) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const productId = products.products.findIndex(
    (product) => product.id === Number(id)
  );
  if (productId === -1) {
    res.status(404).json({ error: "Product not found" });
  }
  res.json(products.products[productId]);
});

app.use("/", router);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
