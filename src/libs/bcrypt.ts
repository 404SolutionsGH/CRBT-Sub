import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();



export const encryptPassword = async (rawPassword: string): Promise<string> => {
  return await bcrypt.hash(rawPassword, 10);
};

export const verifyPassword = async (rawPassword: string,encryptedPassword:string) => {
  return await bcrypt.compare(rawPassword, encryptedPassword);
};