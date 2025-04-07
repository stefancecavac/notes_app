import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AppError from "./errorHandler";

declare module "express" {
  export interface Request {
    user?: any;
  }
}

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new AppError("No auth token provided", 401));
  }
  try {
    const verifiedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);

    if (!verifiedToken) {
      return next(new AppError("Invalid credentials", 401));
    }

    req.user = verifiedToken;

    next();
  } catch (error) {
    return next(new AppError("Access token expired, please refresh your token", 401));
  }
};

export default authenticate;
