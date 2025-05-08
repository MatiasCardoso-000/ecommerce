import { useProducts } from "../../hooks/useProducts";

export const ProductsList = () => {
  const { randomProducts } = useProducts();
  return (
    <section className="w-full min-h-screen  grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))]  justify-center items-center p-4 gap-4">
      {" "}
      {randomProducts.map((product) => {
        return (
          <ul>
            <li
              key={product.id}
              className="flex flex-col justify-evenly text-center m-auto gap-4 bg-white border shadow-md border-slate-100 text-slate-500 md:w-[220px] md:h-[380px] p-4 rounded-md"
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
              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 cursor-pointer">
                Add
              </button>
            </li>
          </ul>
        );
      })}
    </section>
  );
};
