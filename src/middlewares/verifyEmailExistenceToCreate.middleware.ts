import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/AppError";

const verifyEmailExistenceMiddlewareToCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const userRepo = AppDataSource.getRepository(User);

  const foundUser = await userRepo.exist({
    where: { email: email },
  });

  if (foundUser) {
    throw new AppError("E-mail already registered", 400);
  }

  return next();
};

export default verifyEmailExistenceMiddlewareToCreate;
