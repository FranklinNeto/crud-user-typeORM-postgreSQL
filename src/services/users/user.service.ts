import { IUserRequest } from "../../interfaces/users/index";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserResponse } from "../../interfaces/users/index";
import { usersWihoutPasswordSchema } from "../../schemas/users.schema";
import { IUserUpdateRequest } from "../../interfaces/users/index";

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

const retrieveUserService = async (userID: string): Promise<User> => {
  const userRepo = AppDataSource.getRepository(User);

  return await userRepo.findOneBy({ id: userID });
};

const updateUserService = async (
  userID: string,
  userData: IUserUpdateRequest
): Promise<IUserResponse> => {
  const userRepo = AppDataSource.getRepository(User);

  const foundUser = await userRepo.findOneBy({ id: userID });

  const updatedUser = userRepo.create({
    ...foundUser,
    ...userData,
  });

  await userRepo.save(updatedUser);

  const updatedUserWithoutPassword = await usersWihoutPasswordSchema.validate(
    updatedUser,
    {
      stripUnknown: true,
    }
  );

  return updatedUserWithoutPassword;
};

const deleteUserService = async (userID: string): Promise<{}> => {
  const userRepo = AppDataSource.getRepository(User);
  const foundUser = await userRepo.findOneBy({ id: userID });

  await userRepo.softRemove(foundUser);

  const deletedUser = await userRepo.save({ ...foundUser, isActive: false });

  /* const deletedUserWithoutPassword = usersWihoutPasswordSchema.validate(
    deletedUser,
    {
      stripUnknown: true,
    }
  ); */

  return {};
};

export {
  createUserService,
  listUserService,
  retrieveUserService,
  updateUserService,
  deleteUserService,
};
