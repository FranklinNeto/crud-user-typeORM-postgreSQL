import { Router } from "express";

import {
  createUserController,
  deleteUserController,
  listUserController,
  retrieveUserController,
  updateUserController,
} from "../controllers/user.controller";
import verifyAuthTokenMiddleware from "../middlewares/verifyAuthToken.middleware";
import verifyIfDataIsValidMiddleware from "../middlewares/verifyIfDataIsValid.middleware";
import { userSchema } from "../schemas/users.schema";
import { usersUpdateSchema } from "../schemas/users.schema";

const userRouter = Router();

userRouter.post(
  "",
  verifyIfDataIsValidMiddleware(userSchema),
  createUserController
);

userRouter.get("", verifyAuthTokenMiddleware, listUserController);

userRouter.get("/:id", verifyAuthTokenMiddleware, retrieveUserController);

userRouter.patch(
  "/:id",
  verifyIfDataIsValidMiddleware(usersUpdateSchema),
  updateUserController
);

userRouter.delete("/:id", verifyAuthTokenMiddleware, deleteUserController);

export default userRouter;
