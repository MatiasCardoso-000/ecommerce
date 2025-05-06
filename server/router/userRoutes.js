import { Router } from "express";
import { login, logout, register, verifyToken } from "../controllers/auth.controller.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { validateToken } from "../middleware/validateToken.js";
import { loginSchema, registerSchema } from "../schemas/registerSchema.js";

export const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.get("/profile",  verifyToken);
router.post("/logout", logout);
