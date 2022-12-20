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
import verifyEmailExistenceMiddleware from "../middlewares/verifyEmailExistence.middleware";
import verifyUserExistenceMiddleware from "../middlewares/verifyUserExistence.middleware";
import verifyIsOwnerMiddleware from "../middlewares/verifyIsOwner.middleware";
import verifyIfUserIsAdm from "../middlewares/verifyIfUserIsAdm.middleware";

const userRoutes = Router();

userRoutes.post(
  "",
  verifyIfDataIsValidMiddleware(userSchema),
  verifyEmailExistenceMiddleware,
  createUserController
);

userRoutes.get(
  "",
  verifyAuthTokenMiddleware,
  verifyIfUserIsAdm,
  listUserController
);

userRoutes.get("/:id", verifyAuthTokenMiddleware, retrieveUserController);

userRoutes.patch(
  "/:id",
  verifyIfDataIsValidMiddleware(usersUpdateSchema),
  verifyAuthTokenMiddleware,
  verifyUserExistenceMiddleware,
  verifyIsOwnerMiddleware,
  updateUserController
);

userRoutes.delete(
  "/:id",
  verifyAuthTokenMiddleware,
  verifyUserExistenceMiddleware,
  verifyIsOwnerMiddleware,
  deleteUserController
);

export default userRoutes;
