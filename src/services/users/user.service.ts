import { IUserRequest } from "../../interfaces/users/index";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserResponse } from "../../interfaces/users/index";
import { usersWihoutPasswordSchema } from "../../schemas/users.schema";

const createUserService = async (
  userData: IUserRequest
): Promise<IUserResponse> => {
  const userRepo = AppDataSource.getRepository(User);
  const newUser = userRepo.create(userData);

  await userRepo.save(newUser);

  const userWithoutPassword = await usersWihoutPasswordSchema.validate(
    newUser,
    {
      stripUnknown: true,
    }
  );

  return userWithoutPassword;
};

const listUserService = async (): Promise<User[]> => {
  const userRepo = AppDataSource.getRepository(User);

  return await userRepo.find();
};

const retrieveUserService = async (userID: string): Promise<User> => {
  const userRepo = AppDataSource.getRepository(User);

  return await userRepo.findOneBy({ id: userID });
};

export { createUserService, listUserService, retrieveUserService };
