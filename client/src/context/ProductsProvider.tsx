import { useEffect, useState } from "react";
import { Product } from "../types/products.interface";
import { ProductsContext } from "./ProductsContext";
import { useFetch } from "../hooks/useFetch";

interface ProductsProviderParams {
  children: React.ReactNode;
}

export const ProductsProvider = ({ children }: ProductsProviderParams) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const URL = `${BACKEND_URL}/products`;

  const { data } = useFetch<Product[]>(URL);

  useEffect(() => {
    const destructuredData = data.map((product: Product) => {
      const { items, section } = product;
      return {
        items,
        section,
      };
    });

    const items = destructuredData.flatMap(product => product.items);

    setProducts(items);
  }, [data]);

  useEffect(() => {
    const createRandomProducts = () => {
      const copiedProducts = [...products];
      const sortedProducts = copiedProducts.sort(() => Math.random() - 0.5);
      const slicedProducts = sortedProducts.slice(0, 5);

      setRandomProducts(slicedProducts);
    };

    if (products.length > 0) {
      createRandomProducts();
    }
  }, [products]);

  return (
    <ProductsContext.Provider value={{ products, randomProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};
