import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare module "express" {
  export interface Request {
    user?: any;
  }
}

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({ message: "No auth token provided" });
  }
  try {
    const verifiedToken = jwt.verify(token, process.env.JWTSECRET as string);

    if (!verifiedToken) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    req.user = verifiedToken;

    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Invalid credentials" });
  }
};

export default authenticate;
