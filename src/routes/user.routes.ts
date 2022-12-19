import { Router } from "express";

import {
  createUserController,
  listUserController,
  retrieveUserController,
} from "../controllers/user.controller";
import verifyAuthTokenMiddleware from "../middlewares/verifyAuthToken.middleware";
import verifyIfDataIsValidMiddleware from "../middlewares/verifyIfDataIsValid.middleware";
import { userSchema } from "../schemas/users.schema";

const userRouter = Router();

userRouter.post(
  "",
  verifyIfDataIsValidMiddleware(userSchema),
  createUserController
);
userRouter.get("", verifyAuthTokenMiddleware, listUserController);
userRouter.get("/:id", verifyAuthTokenMiddleware, retrieveUserController);

export default userRouter;
