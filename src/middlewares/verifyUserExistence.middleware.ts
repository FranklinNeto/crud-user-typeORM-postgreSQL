import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/AppError";

const verifyUserExistenceMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userID = req.params.id;

  const userRepo = AppDataSource.getRepository(User);

  const foundUser = await userRepo.findOneBy({ id: userID });

  if (foundUser === null) {
    throw new AppError("User not found", 404);
  }

  return next();
};

export default verifyUserExistenceMiddleware;
