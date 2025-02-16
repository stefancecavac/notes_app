import { NextFunction, Request, Response } from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import { client } from "..";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../util/GenerateAccessToken";
import { generateRefreshToken } from "../util/GenerateRefreshToken";
import AppError from "../middleware/ErrorHandlerMiddleware";

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please fill out all fields", 400));
  }

  if (!validator.isEmail(email)) {
    return next(new AppError("Not a valid email", 400));
  }

  if (!validator.isStrongPassword(password)) {
    return next(new AppError("Not a strong password , password must contain atleast: one capital letter , one number , one special character", 400));
  }

  try {
    const emailExists = await client.user.findUnique({
      where: {
        email: email,
      },
    });

    if (emailExists) {
      return next(new AppError("User with that email already exists", 400));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await client.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

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

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please fill out all fields", 400));
  }

  try {
    const user = await client.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return next(new AppError("Invalid credentials", 400));
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return next(new AppError("Invalid credentials", 400));
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    console.log(accessToken);

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

export { registerUser, loginUser, logoutUser, getCurrentUser, refreshToken };
