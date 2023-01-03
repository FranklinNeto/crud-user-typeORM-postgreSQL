import { IUserRequest } from "../../interfaces/users/index";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUser } from "../../interfaces/users/index";
import { usersWihoutPasswordSchema } from "../../schemas/users.schema";
import { IUserUpdate } from "../../interfaces/users/index";

const createUserService = async (userData: IUserRequest): Promise<IUser> => {
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

  return await userRepo.find({
    select: {
      name: true,
      email: true,
      isAdm: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      id: true,
    },
  });
};

const updateUserService = async (
  userID: string,
  userData: IUserUpdate
): Promise<IUser> => {
  const userRepo = AppDataSource.getRepository(User);

  const foundUser = await userRepo.findOneBy({ id: userID });

  const updatedUser = await userRepo.save({ ...foundUser, ...userData });

  const updatedUserWithoutPassword = await usersWihoutPasswordSchema.validate(
    updatedUser,

    {
      stripUnknown: true,
    }
  );

  return updatedUserWithoutPassword;
};

const deleteUserService = async (userID: string): Promise<void> => {
  const userRepo = AppDataSource.getRepository(User);
  const foundUser = await userRepo.findOneBy({ id: userID });

  await userRepo.save({ ...foundUser, isActive: false });
};

export {
  createUserService,
  listUserService,
  updateUserService,
  deleteUserService,
};
