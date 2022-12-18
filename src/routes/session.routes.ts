import { Router } from "express";
import createSessionController from "../controllers/createSession.controller";

const sessionRouter = Router();

sessionRouter.post("", createSessionController);

export default sessionRouter;
