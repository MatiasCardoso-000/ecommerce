import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ProductsProvider } from "./context/Products/ProductsProvider.tsx";
import { AuthProvider } from "./context/Auth/AuthProvider.tsx";
import { AppHookContainer } from "./AppHookContainer.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ProductsProvider>
        <AppHookContainer />
      </ProductsProvider>
    </AuthProvider>
  </StrictMode>
);
