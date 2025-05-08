import { FieldValues, UseFormRegister } from "react-hook-form";

interface Params {
  id: string;
  type: string;
  register?: ReturnType<UseFormRegister<FieldValues>>;
}

export const Input = ({ id, type, register }: Params) => {
  return (
    <input
      id={id}
      type={type}
      {...register}
      className="border border-slate-300 w-[400px] p-2 rounded-md outline-0"
    />
  );
};
