import { useEffect, useState } from "react";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function App() {
  interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
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
    <>
      <form
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const target = e.target as HTMLFormElement;
          const title = (target.elements[0] as HTMLInputElement).value;
          const category = (target.elements[1] as HTMLInputElement).value;
          const price = (target.elements[2] as HTMLInputElement).value;
          const description = (target.elements[3] as HTMLInputElement).value;

          const res = await fetch(`${BACKEND_URL}/products`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
              description,
              price,
              category,
            }),
          });

          const data = await res.json();
         setProducts([...products, data]);
        }}
      >
        <input type="text" placeholder="name" />
        <input type="text" placeholder="category" />
        <input type="text" placeholder="price" />
        <input type="text" placeholder="description" />
        <button>Create</button>
      </form>
      <section className="productsList">
        {products.map((product) => {
          return (
            <div className="productCard" key={product.id}>
              {" "}
              <h3>{product.title}</h3> <p>{product.description}</p>{" "}
              <p>{product.price}</p> <p>{product.category}</p>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default App;
