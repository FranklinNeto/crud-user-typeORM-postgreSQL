/* import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";

const verifyUserExistenceMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
    const userID: string = req.params.id
  
    const userRepo = AppDataSource.getRepository(User);

    userRepo.findOneBy({id:userID})


 
 
 
 
  const userIndex = users.findIndex((user) => user.uuid === req.params.id);

  if (userIndex === -1) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  req.user = {
    ...req.user,
    userIndex: userIndex,
  };

  return next();
};

export default verifyUserExistenceMiddleware; */
