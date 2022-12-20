import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

const verifyIsOwnerDeleteMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isAdm } = req.user;

  if (isAdm) {
    return next();
  } else {
    throw new AppError("Missing admin permissions", 403);
  }
};
export default verifyIsOwnerDeleteMiddleware;
