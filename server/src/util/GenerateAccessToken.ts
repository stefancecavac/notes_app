import jwt from "jsonwebtoken";

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "30m" });
};
