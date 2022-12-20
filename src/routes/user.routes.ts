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
import verifyIsOwnerUpdateMiddleware from "../middlewares/verifyIsOwnerUpdate.middleware";
import verifyIfUserIsAdm from "../middlewares/verifyIfUserIsAdm.middleware";
import verifyIsOwnerDeleteMiddleware from "../middlewares/verifyIsOwnerDelete.middleware";
import verifyUpdateReqBodyMiddleware from "../middlewares/verifyUpdateReqBody.middleware";
import verifyIfUserIsActiveMiddleware from "../middlewares/verifyIfUserIsActive.middleware";
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
  verifyUpdateReqBodyMiddleware,
  verifyIfDataIsValidMiddleware(usersUpdateSchema),
  verifyEmailExistenceMiddleware,
  verifyAuthTokenMiddleware,
  verifyUserExistenceMiddleware,
  verifyIsOwnerUpdateMiddleware,
  updateUserController
);

userRoutes.delete(
  "/:id",
  verifyAuthTokenMiddleware,
  verifyUserExistenceMiddleware,
  verifyIsOwnerDeleteMiddleware,
  verifyIfUserIsActiveMiddleware,
  deleteUserController
);

export default userRoutes;
