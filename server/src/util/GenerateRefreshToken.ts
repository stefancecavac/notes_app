import jwt from "jsonwebtoken";

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "10d" });
};
