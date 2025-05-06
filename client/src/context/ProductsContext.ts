import { createContext } from "react";
import { Product } from "../types/products.interface";

interface ProductsContextType {
  products: Product[];
  randomProducts: Product[]
}

export const ProductsContext = createContext<ProductsContextType>({
  products: [],
  randomProducts: [],
});
