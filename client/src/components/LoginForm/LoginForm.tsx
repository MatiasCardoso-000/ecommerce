import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { Input } from "../Input/Input";
import { User } from "../../types/user.interface";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const { errors: LoginErrors, signIn, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (value) => {
    signIn(value);
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  });

  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center">
      {LoginErrors.map((error, i) => (
        <div key={i} className="bg-red-400 p-2 text-white">
          {error}
        </div>
      ))}
      <form onSubmit={onSubmit} className="flex flex-col items-center gap-4 ">
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          type="email"
          register={{ ...register("email", { required: true }) }}
        />
        {errors.email && (
          <p className="text-red-500 font-semibold">
            El campo email es obligatorio
          </p>
        )}

        <label htmlFor="username">Password</label>
        <Input
          id="password"
          type="password"
          register={{ ...register("password", { required: true }) }}
        />
        {errors.password && (
          <p className="text-red-500  font-semibold">
            El campo password es obligatorio
          </p>
        )}
        <button className="bg-red-500 font-semibold p-4 text-slate-50 cursor-pointer hover:bg-red-400">
          Ingresar
        </button>
      </form>
    </div>
  );
};
