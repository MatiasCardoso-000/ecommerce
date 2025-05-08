import { createContext } from "react";
import { User } from "../../types/user.interface";

interface AuthContextInterface {
  user: User;
  errors: string[],
  loading:boolean,
  isAuthenticated: boolean,
  signUp: (user: User) => void;
  signIn: (user:User) => void
}

export const AuthContext = createContext<AuthContextInterface>({
  user: {} as User,
  errors:[],
  loading:false,
  isAuthenticated: false,
  signUp: (user: User) => user,
  signIn: (user:User) => user
});
