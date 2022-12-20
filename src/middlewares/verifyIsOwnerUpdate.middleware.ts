import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

const verifyIsOwnerUpdateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isAdm, id } = req.user;

  if (isAdm) {
    return next();
  }

  const idParams = req.params.id;

  if (idParams !== id) {
    throw new AppError("Missing admin permissions", 401);
  }
  return next();
};
export default verifyIsOwnerUpdateMiddleware;
