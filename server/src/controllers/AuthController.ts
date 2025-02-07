import { Request, Response } from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import { client } from "..";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../util/GenerateAccessToken";
import { generateRefreshToken } from "../util/GenerateRefreshToken";

const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill out all fields" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Not a valid email" });
  }

  if (!validator.isStrongPassword(password)) {
    return res
      .status(400)
      .json({ message: "Not a strong password , password must contain atleast: one capital letter , one number , one special character" });
  }

  try {
    const emailExists = await client.user.findUnique({
      where: {
        email: email,
      },
    });

    if (emailExists) {
      return res.status(400).json({ message: "User with that email already exists" });
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
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill out all fields" });
  }

  try {
    const user = await client.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
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
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  console.log(refreshToken);

  if (!refreshToken) {
    return res.status(403).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);
    console.log("decoded", decoded);

    const accessToken = generateAccessToken((decoded as any).userId);

    return res.status(200).json({ accessToken });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};

const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("refreshToken").json({ message: "User successfuly logged out" });
};

const getCurrentUser = async (req: Request, res: Response) => {
  const { userId } = req.user;
  try {
    const user = await client.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "not authorized" });
    }
    res.status(200).json({ email: user?.email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export { registerUser, loginUser, logoutUser, getCurrentUser, refreshToken };
