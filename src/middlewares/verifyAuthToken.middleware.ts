import jwt from "jsonwebtoken";
import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

const verifyAuthTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    throw new AppError("Missing authorization headers", 401);
  }

  const token = authToken.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, (error, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    req.user = {
      id: decoded.sub,
      isAdm: decoded.isAdm,
    };

    return next();
  });
};

export default verifyAuthTokenMiddleware;
