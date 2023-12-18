import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const hashPassword = async (password: string) => {
  let salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS || "10"));
  return await bcrypt.hash(password, salt);
};

export default { hashPassword };
