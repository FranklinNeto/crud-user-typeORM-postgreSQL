import { Request, Response } from "express";
import {
  createUserService,
  listUserService,
  updateUserService,
  deleteUserService,
} from "../services/users/user.service";
import { IUserRequest, IUserUpdate } from "../interfaces/users/index";

const createUserController = async (req: Request, res: Response) => {
  const userData: IUserRequest = req.body;

  const user = await createUserService(userData);

  return res.status(201).json(user);
};

const listUserController = async (req: Request, res: Response) => {
  const users = await listUserService();

  return res.status(200).json(users);
};

const updateUserController = async (req: Request, res: Response) => {
  const userID: string = req.params.id;
  const userData: IUserUpdate = req.body;

  const updatedUser = await updateUserService(userID, userData);

  return res.json(updatedUser);
};

const deleteUserController = async (req: Request, res: Response) => {
  const userID: string = req.params.id;
  const deletedUser = await deleteUserService(userID);

  return res.status(204).json(deletedUser);
};

export {
  createUserController,
  listUserController,
  updateUserController,
  deleteUserController,
};
