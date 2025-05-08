import { Router } from "express";
import { validateSchema } from "../middleware/validateSchema.js";
import { productSchema } from "../schemas/productSchema.js";
import { addProduct, getProducts, productById} from "../controllers/products.controller.js";

export const router = Router();

router.post("/products", validateSchema(productSchema),addProduct);
router.get('/products', getProducts)
router.get("/products/:id", productById);
