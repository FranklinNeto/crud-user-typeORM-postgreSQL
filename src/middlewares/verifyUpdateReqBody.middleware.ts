import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

const verifyUpdateReqBodyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const keys = Object.keys(req.body);

  const forbiddenKeys = keys.some((elem) => {
    return elem !== "name" && elem !== "password" && elem !== "email";
  });

  if (forbiddenKeys) {
    throw new AppError("Impossible update", 401);
  }

  next();
};

export default verifyUpdateReqBodyMiddleware;
