import { Request, Response } from "express";
import { ISessionRequest } from "../interfaces/session";
import { createSessionService } from "../services/session/session.service";

const createSessionController = async (req: Request, res: Response) => {
  const sessionData: ISessionRequest = req.body;

  const token = await createSessionService(sessionData);

  return res.status(200).json({ token });
};

export default createSessionController;
