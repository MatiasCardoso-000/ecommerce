import { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
    rating: string;
  }

  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    const URL = `${BACKEND_URL}/products`;
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error("Fetching error");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main className=" min-h-screen items-center justify-center">
      <section className="w-full min-h-screen  grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))]  justify-center items-center p-4">
        {products.map((product) => {
          return (
            <div
              className="flex flex-col justify-evenly text-center m-auto gap-4 bg-white border shadow-md border-slate-100 text-slate-500 md:w-[220px] md:h-[380px] p-4 rounded-md"
              key={product.id}
            >
              {" "}
              <h3 className="truncate text-2xl font-semibold">
                {product.title}
              </h3>{" "}
              <p className="truncate">{product.description}</p>{" "}
              <p className="font-semibold">{product.price}</p>
              <div className="flex justify-center gap-2">
                <p className="font-bold">Categoria: </p>
                <span className="font-semibold">{product.category}</span>
              </div>
              <div className="flex justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full md:w-[50px]"
                />
              </div>
              <span className="font-semibold ">{product.rating}</span>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 cursor-pointer">
                Add
              </button>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default App;
