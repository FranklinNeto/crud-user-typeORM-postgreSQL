import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

const verifyIsOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isAdm, id } = req.user;

  console.log({ olha_aqui: id });

  if (isAdm) {
    return next();
  }

  const idParams = req.params.id;

  if (idParams !== id) {
    throw new AppError("Missing admin permissions", 403);
  }
  return next();
};
export default verifyIsOwnerMiddleware;
