import { Request, Response, NextFunction } from "express";
import { AppError } from "../../domain/entities/AppError";
import { ValidationError } from "sequelize";

export const errorHandler = async (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
  } else if (err instanceof ValidationError) {
    res.status(400).json({ error: err.message.split(":")[1] });
  } else {
    res.status(500).json({ error: "Server Error" });
  }
};
