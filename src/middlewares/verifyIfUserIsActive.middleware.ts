import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/AppError";

const verifyIfUserIsActiveMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userID = req.params.id;

  const userRepo = AppDataSource.getRepository(User);
  const foundUser = await userRepo.findOneBy({ id: userID });

  if (foundUser.isActive === false) {
    throw new AppError("User have already been deleted", 400);
  }

  next();
};

export default verifyIfUserIsActiveMiddleware;
