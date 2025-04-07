import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import AppError from "./errorHandler";

interface validationTypes {
  body?: ZodSchema;
  params?: ZodSchema;
}

export const validate =
  ({ body, params }: validationTypes) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (body) {
        const bodyResult = body.safeParse(req.body);

        if (!bodyResult.success) {
          return next(new AppError(bodyResult.error.errors.map((err) => err.message).join(","), 400));
        }
      }

      if (params) {
        const paramsResult = params.safeParse(req.params);

        if (!paramsResult.success) {
          return next(new AppError(paramsResult.error.errors.map((err) => err.message).join(","), 400));
        }
      }

      next();
    } catch (error) {
      next(error);
    }
  };
