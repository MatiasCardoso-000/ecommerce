import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  registerRequest,
  loginRequest,
  verifyToken,
} from "../../../../server/api/auth.js";
import { User } from "../../types/user.interface.js";
import Cookies from "js-cookie";

interface Params {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Params) => {
  const [user, setUser] = useState<User>({} as User);
  const [errors, setErrors] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const signUp = async (user: User): Promise<void> => {
    try {
      const res = await registerRequest(user);
      console.log("Usuario registrado: ", res.data);
      setUser(res.data);
    } catch (error: any) {
      console.log(error.response.data.message);
      setErrors(error.response.data.message);
    }
  };

  const signIn = async (user: User) => {
    try {
      const res = await loginRequest(user);
      if (res.status !== 200) {
        throw new Error("Error al iniciar sesion");
      }
      console.log("Usuario logeado ", res.data);
      setUser(res.data);
    } catch (error: any) {
      console.log(error.response.data.message);
      setErrors(error.response.data.message);
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser({} as User);
      }

      try {
        const res = await verifyToken(cookies.token);

        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({} as User);
        setLoading(false);
        console.error(error);
      }
    };
    checkLogin();
  }, [isAuthenticated]);

  return (
    <AuthContext value={{ user, errors, loading,isAuthenticated, signUp, signIn }}>
      {children}
    </AuthContext>
  );
};
