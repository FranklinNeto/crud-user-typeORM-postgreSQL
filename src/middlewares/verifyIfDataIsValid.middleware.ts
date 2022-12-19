import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";

const verifyIfDataIsValidMiddleware =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedBody = await schema.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });

      req.body = validatedBody;

      return next();
    } catch (error) {
      return res.status(400).json({
        message: error.errors,
      });
    }
  };

export default verifyIfDataIsValidMiddleware;
