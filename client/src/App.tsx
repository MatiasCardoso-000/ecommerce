import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([])


  const getProducts = async () => {
    const URL = "http://localhost:3000/products";
    try {
      const response = await fetch(URL);
      if(!response.ok) {
        throw new Error("Fetching error")
      }
      const data = await response.json()
      const {products} = data

      setProducts(products)
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    getProducts()
  },[])

  return (
    <>
      {products.map((p) => (
        <div key={p.id}>{p.title}</div>
      ))}
    </>
  );
}

export default App;
