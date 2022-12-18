import { Request, Response } from "express";
import {
  createUserService,
  listUserService,
  retrieveUserService,
} from "../services/user.service";

const createUserController = async (req: Request, res: Response) => {
  const user = await createUserService(req.body);
  return res.status(201).json(user);
};

const listUserController = async (req: Request, res: Response) => {
  const users = await listUserService();
  return res.status(200).json(users);
};

const retrieveUserController = async (req: Request, res: Response) => {
  const user = await retrieveUserService(req.params.id);

  return res.status(200).json(user);
};

export { createUserController, listUserController, retrieveUserController };
