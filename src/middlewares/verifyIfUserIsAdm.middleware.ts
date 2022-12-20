import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/AppError";

const verifyIfUserIsAdm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepo = AppDataSource.getRepository(User);

  const userID = req.user.id;

  const userIsAdm = req.user.isAdm;

  const foundUserByID = await userRepo.findOneBy({ id: userID });

  if (foundUserByID === null) {
    throw new AppError("User not Found", 404);
  }

  if (!userIsAdm) {
    throw new AppError("Missing admin permissions", 403);
  }

  return next();
};

export default verifyIfUserIsAdm;
