import { Router } from "express";

import {
  createUserController,
  listUserController,
  retrieveUserController,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("", createUserController);
userRouter.get("", listUserController);
userRouter.get("/:id", retrieveUserController);

export default userRouter;
