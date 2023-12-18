import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET || "";
const signToken = (user: any) => {
  let maxAge = 60 * 60 * 24 * 7; // 1 week

  const tokenBody = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(tokenBody, JWT_SECRET, {
    expiresIn: maxAge,
  });
};

const extractToken = (token: any) => {
  let tokenArray: any[] = token.split(" ");
  if (tokenArray.length !== 2) return null;
  return tokenArray[1];
};

const verifyToken = (token: any) => {
  return jwt.verify(token, JWT_SECRET);
};

const comparePassword = async (password: string, hash: string) => {
  return await bcryptjs.compare(password, hash);
};

export default { signToken, extractToken, comparePassword, verifyToken };
