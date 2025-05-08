import express from "express";
import cors from "cors";
import { app } from "./server.js";
import { router as productsRouter } from "./router/productsRoutes.js";
import { router as userRouter } from "./router/userRoutes.js";
import { connectDB } from "./db.js";
import cookieParser from "cookie-parser";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

connectDB();

app.use("/api", productsRouter);
app.use("/auth", userRouter);
