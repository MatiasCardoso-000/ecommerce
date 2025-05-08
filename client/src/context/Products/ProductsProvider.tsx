import { useEffect, useState } from "react";
import { Product } from "../../types/products.interface";
import { useFetch } from "../../hooks/useFetch";
import { ProductsContext } from "./ProductsContext";

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
   setProducts(data)

    const createRandomProducts = () => {
      const copiedProducts = [...products];
      const sortedProducts = copiedProducts.sort(() => Math.random() - 0.5);
      const slicedProducts = sortedProducts.slice(0, 5);

      setRandomProducts(slicedProducts);
    };

    if (products.length > 0) {
      createRandomProducts();
    }
  }, [data,products]);

  return (
    <ProductsContext.Provider value={{ products, randomProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};
