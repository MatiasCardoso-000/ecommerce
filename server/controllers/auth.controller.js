import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { createToken } from "../libs/jwt.js";
import { TOKEN_SECRET } from "../config/config.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({
      message: "Todos los campos son obligatorios",
    });
    throw new Error("Todos los campos son obligatorios");
  }

  const userFound = await User.findOne({ email });

  if (userFound) {
    return res.status(400).json({ message: "The email is already in use" });
  }

  const hashPassword = await bcrypt.hash(password, 12);

  try {
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    const savedUser = await newUser.save();

    const token = createToken({ id: savedUser._id });
    res.cookie("token", token);
    res.json(savedUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const userFound = await User.findOne({ email });
  try {
    if (!userFound) {
      res.status(404).json({ message: ["Usuario/Clave incorrectos"] });
      throw new Error("Usuario/Clave incorrectos");
    }

    const comparePassword = await bcrypt.compare(password, userFound.password);

    if (!comparePassword) {
      res.status(400).json({
        message: ["Usuario/Clave incorrectos"],
      });
      throw new Error("Usuario/Clave incorrectos");
    }

    const token = createToken({ id: userFound._id });
    res.cookie("token", token);

    res.json({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
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
