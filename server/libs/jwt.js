import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config.js";

export const createToken = (payload) => {
  return jwt.sign(payload, TOKEN_SECRET, { expiresIn: "1d" });
};
