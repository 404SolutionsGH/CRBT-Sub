import jwt, { JwtPayload} from "jsonwebtoken";
import dotenv from "dotenv";
import { AppError } from "../domain/entities/AppError";
dotenv.config();

export const jwtForLogIn = (id: string): string  => {
  if (process.env.JwtSecretKey !== undefined) {
    return jwt.sign({ userId: id }, process.env.JwtSecretKey, { expiresIn: "20d" });
  } else {
    console.log("env variable JwtSecretKey not defined on server");
    throw new AppError("Server errror",500);
  }
};

export const jwtForPayment = (id: string): string => {
  if (process.env.JwtSecretKey !== undefined) {
    return jwt.sign({ transcId: id }, process.env.JwtSecretKey, { expiresIn: "90d" });
  } else {
    console.log("env variable JwtSecretKey not defined on server");
    throw new AppError("Server errror", 500);
  }
};

export const jwtForSignUp = (id: string, verfCode: number): string => {
  if (process.env.JwtSecretKey !== undefined) {
    return jwt.sign({ userId: id, code: verfCode }, process.env.JwtSecretKey, { expiresIn: "1hr" });
  } else {
    console.log("env variable JwtSecretKey not defined on server")
    throw new AppError("Server errror", 500);
  }
};

export const verifyToken = (token: string): JwtPayload | null | string | any => {
  try {
    if (process.env.JwtSecretKey !== undefined) {
      return jwt.verify(token, process.env.JwtSecretKey);
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
