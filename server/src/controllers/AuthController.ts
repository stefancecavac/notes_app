import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../util/GenerateAccessToken";
import { generateRefreshToken } from "../util/GenerateRefreshToken";
import AppError from "../middleware/errorHandler";
import { sendMagicLinkEmail } from "../util/EmailSendService";
import { createIfDoesntExistUserService, getUserByIdService } from "../service/authService";

export const sendMagicLinkController = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

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

export const verifyMagicLinkController = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.body;

  if (!token) {
    return next(new AppError("Token is required", 400));
  }

  try {
    const decoded = jwt.verify(token, process.env.MAGIC_LINK_SECRET as string) as MagicLinkJwtPayload;

    const user = await createIfDoesntExistUserService(decoded.email);

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

export const refreshTokenController = async (req: Request, res: Response, next: NextFunction) => {
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

    res.status(200).json({ accessToken });
  } catch (error) {
    return next(error);
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("refreshToken").json({ message: "User successfuly logged out" });
};

export const getCurrentUserController = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.user;
  try {
    const currentUser = await getUserByIdService(userId);

    if (!currentUser) {
      return next(new AppError("Invalid credentials", 401));
    }
    res.status(200).json({ email: currentUser.email });
  } catch (error) {
    return next(error);
  }
};
