import { NextFunction, Request, Response } from "express";

class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  errors?: Record<string, string[]>;

  constructor(message: string, statusCode: number, errors?: Record<string, string[]>, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
export const errroHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  } else {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
