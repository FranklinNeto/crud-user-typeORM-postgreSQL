import { IUserRequest } from "../interfaces/users/index";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";

const createUserService = async (userData: IUserRequest): Promise<User> => {
  const userRepo = AppDataSource.getRepository(User);
  const newUser = userRepo.create(userData);

  await userRepo.save(newUser);

  return newUser;
};

const listUserService = async (): Promise<User[]> => {
  const userRepo = AppDataSource.getRepository(User);

  return await userRepo.find();
};

const retrieveUserService = async (userID: string): Promise<User> => {
  const userRepo = AppDataSource.getRepository(User);

  return await userRepo.findOneBy({ id: parseInt(userID) });
};

export { createUserService, listUserService, retrieveUserService };
