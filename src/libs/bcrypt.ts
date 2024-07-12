import bcrypt from "bcrypt";




export const encryptPassword = async (rawPassword: string): Promise<string> => {
  return await bcrypt.hash(rawPassword, 10);
};