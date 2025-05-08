import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { User } from "../../types/user.interface";
import { Input } from "../Input/Input";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const { signUp, errors: RegisterErrors } = useAuth();

  const onSubmit = handleSubmit(async (value: User) => {
    signUp(value);
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      {RegisterErrors.map((error,i) => (
        <div key={i}>{error}</div>
      ))}
      <form onSubmit={onSubmit} className="flex flex-col items-center gap-4 ">
        <label htmlFor="username">Username</label>
        <Input
          id="username"
          type="text"
          register={{ ...register("username", { required: true }) }}
        />
        {errors.username && (
          <p className="text-red-500">El campo username es obligatorio</p>
        )}
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          type="email"
          register={{ ...register("email", { required: true }) }}
        />
        {errors.email && (
          <p className="text-red-500">El campo email es obligatorio</p>
        )}
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          type="password"
          register={{ ...register("password", { required: true }) }}
        />
        {errors.password && (
          <p className="text-red-500">El campo password es obligatorio</p>
        )}
        <button className="bg-red-500 font-semibold p-4 text-slate-50 cursor-pointer hover:bg-red-400">
          Registrarse
        </button>
      </form>
    </div>
  );
};
