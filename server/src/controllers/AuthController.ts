import { Request, Response } from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import { client } from "..";
import jwt from "jsonwebtoken";

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

    const token = jwt.sign({ userId: user.id }, process.env.JWTSECRET as string, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 86400000,
    });

    res.status(201).json({ message: "User successfuly registered" });
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

    const token = jwt.sign({ userId: user.id }, process.env.JWTSECRET as string, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 86400000,
    });

    res.status(201).json({ message: "User successfuly loged in" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("token").json({ message: "User successfuly logged out" });
};

const getCurrentUser = async (req: Request, res: Response) => {
  const { userId } = req.user;
  try {
    const user = await client.user.findFirst({
      where: {
        id: userId,
      },
    });
    res.status(200).json({ email: user?.email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export { registerUser, loginUser, logoutUser, getCurrentUser };
