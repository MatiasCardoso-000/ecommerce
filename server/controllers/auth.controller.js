import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { createToken } from "../libs/jwt.js";
import { TOKEN_SECRET } from "../config/config.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      res.status(400).json({
        message: "Todos los campos son obligatorios",
      });
      throw new Error("Todos los campos son obligatorios");
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    const savedUser = await newUser.save();

    const token = await createToken({ id: newUser._id });
    res.cookie("token", token);
    res.json(savedUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });

    if (!userFound) {
      res.status(404).json({ message: "El usuario no existe" });
      throw new Error("El usuario no existe");
    }

    const comparePassword = await bcrypt.compare(password, userFound.password);

    if (!comparePassword) {
      res.status(400).json({
        message: "Las contraseñas no coinciden",
      });
      throw new Error("Las contraseñas no coinciden");
    }

    const token = await createToken({ id: userFound._id });
    res.cookie("token", token);

    res.json({
      _id: userFound.id,
      email: userFound.email,
      username: userFound.username,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json("User disconnected");
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  try {
    if (!token) {
      res.status(400).json({ message: "Unauthorized" });
      return;
    }

    jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.status(401).json({ message: "Unauthorized" });

      const userFound = await User.findById(decoded.id);

      if (!userFound) {
        res.status(401).json({ message: "Unauthorized" });
      }

      res.json({
        username: userFound.username,
        email: userFound.email,
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
