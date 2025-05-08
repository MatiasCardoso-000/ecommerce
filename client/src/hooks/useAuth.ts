import { useContext } from "react";
import { AuthContext } from "../context/Auth/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be within a provider");

  return context
};
