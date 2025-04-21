import express from "express";
import {app} from "./server"
import cors from "cors";
import { router as productsRouter } from "./router/productsRoutes";
import { connectDB } from "./db";

app.use(express.json());
app.use(cors());

connectDB()

app.use("/", productsRouter);