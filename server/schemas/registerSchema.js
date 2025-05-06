import zod from "zod";

export const registerSchema = zod.object({
  username: zod.string({
    required_error: "Debe ingresar un nombre de usuairo",
  }),
  email: zod
    .string({ required_error: "El email es requerido" })
    .email("El email es invalido"),
  password: zod
    .string({ required_error: "Debe ingresar una contraseña" })
    .min(6, "La contraseña debe ser al menos de 6 caracteres"),
});

export const loginSchema = zod.object({
  email: zod.string({ required_error: "Ingrese un email válido" }).email("El email es invalido"),
  password: zod
    .string({ required_error: "Debe ingresar una contraseña" })
    .min(6, "La contraseña debe ser al menos de 6 caracteres"),
});
