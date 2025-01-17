import { Request, Response, NextFunction } from "express";
import { AppError } from "../../domain/entities/AppError";
import { ValidationError } from "sequelize";
import { FirebaseAuthError } from "firebase-admin/lib/utils/error";
import { logToFile } from "../../@common/helperMethods/logs/loger";

export const errorHandler = async (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
  } else if (err instanceof ValidationError) {
    console.log(err);
    res.status(400).json({ error: err.message.split(":")[1] });
  } else if (err instanceof SyntaxError) {
    await logToFile("SynthaxErrors.txt", err.message);
    res.status(400).json({ error: err.message });
  } else {
    console.log(err);
    await logToFile("ServerErrors.txt", err.message);
    res.status(500).json({ error: "Server Error" });
  }
};
