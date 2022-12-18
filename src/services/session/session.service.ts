import { ISessionRequest } from "../../interfaces/session/index";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import { AppError } from "../../errors/AppError";
import "dotenv/config";

const createSessionService = async ({
  email,
  password,
}: ISessionRequest): Promise<string> => {
  const sessionRepo = AppDataSource.getRepository(User);

  const user = await sessionRepo.findOneBy({ email: email });

  if (!user) {
    throw new AppError("Invalid user or password", 401);
  }

  const passwordMatch = compare(password, user.password);

  if (passwordMatch) {
    throw new AppError("Invalid user or password", 401);
  }

  const token = jwt.sign({ isAdm: user.isAdm }, process.env.SECRET_KEY, {
    subject: user.id,
    expiresIn: "24h",
  });

  return token;
};

export { createSessionService };
