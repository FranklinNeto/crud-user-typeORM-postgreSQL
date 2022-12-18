import { Request, Response } from "express";
import {
  createUserService,
  listUserService,
  retrieveUserService,
} from "../services/users/user.service";
import { IUserRequest } from "../interfaces/users/index";

const createUserController = async (req: Request, res: Response) => {
  const userData: IUserRequest = req.body;

  const user = await createUserService(userData);

  return res.status(201).json(user);
};

const listUserController = async (req: Request, res: Response) => {
  const users = await listUserService();

  return res.status(200).json(users);
};

const retrieveUserController = async (req: Request, res: Response) => {
  const userID: string = req.params.id;

  const user = await retrieveUserService(userID);

  return res.status(200).json(user);
};

export { createUserController, listUserController, retrieveUserController };
