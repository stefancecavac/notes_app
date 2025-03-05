import { NextFunction, Request, Response } from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import { client } from "..";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../util/GenerateAccessToken";
import { generateRefreshToken } from "../util/GenerateRefreshToken";
import AppError from "../middleware/ErrorHandlerMiddleware";
import { sendMagicLinkEmail } from "../util/EmailSendService";

export const sendMagicLink = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError("Please fill out all fields", 400));
  }

  if (!validator.isEmail(email)) {
    return next(new AppError("Not a valid email", 400));
  }

  try {
    await sendMagicLinkEmail(email);
    res.status(201).json({ message: "Magic link sent" });
  } catch (error) {
    return next(error);
  }
};

interface MagicLinkJwtPayload {
  email: string;
  iat: number;
  exp: number;
}

export const verifyMagicLink = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.body;

  if (!token) {
    return next(new AppError("Token is required", 400));
  }

  try {
    const decoded = jwt.verify(token, process.env.MAGIC_LINK_SECRET as string) as MagicLinkJwtPayload;

    let user = await client.user.findUnique({
      where: {
        email: decoded.email,
      },
    });

    if (!user) {
      user = await client.user.create({
        data: {
          email: decoded.email,
        },
      });
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 864000000,
    });

    res.status(201).json({ accessToken });
  } catch (error) {
    return next(error);
  }
};

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return next(new AppError("Not authorized", 403));
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);
    if (!decoded) {
      return next(new AppError("Expired jwt", 403));
    }

    const accessToken = generateAccessToken((decoded as any).userId);

    return res.status(200).json({ accessToken });
  } catch (error) {
    return next(error);
  }
};

const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("refreshToken").json({ message: "User successfuly logged out" });
};

const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.user;
  try {
    const user = await client.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return next(new AppError("Invalid credentials", 401));
    }
    res.status(200).json({ email: user?.email });
  } catch (error) {
    return next(error);
  }
};

export { logoutUser, getCurrentUser, refreshToken };
