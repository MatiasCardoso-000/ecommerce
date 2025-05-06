import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config.js";

export const validateToken = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(403).json({ message: "No token, authorization denied" });
    return;
  }

 jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = decoded;
    next();
  });
};
