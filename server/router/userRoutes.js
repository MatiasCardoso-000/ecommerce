import { Router } from "express";
import { login, logout, register, verifyToken } from "../controllers/auth.controller.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { loginSchema, registerSchema } from "../schemas/authSchema.js";

export const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.get("/verify",  verifyToken);
router.post("/logout", logout);
