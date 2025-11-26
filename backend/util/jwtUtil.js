import jwt from "jsonwebtoken";
import { buildErrorResponse } from "./util.js";

export const generateJWT = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "20m",
    }
  );
};

export const validateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json(buildErrorResponse("Usuario no authorizado"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = tokenData;
    next();
  } catch (error) {
    return res
      .status(401)
      .json(buildErrorResponse("Acceso no autorizado - " + error.message));
  }
};
