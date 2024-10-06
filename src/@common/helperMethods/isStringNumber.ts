import { AppError } from "../../domain/entities/AppError";

export const isStringContentNumber = (content: string,variableName:string) => {
  const alphaReg = /[a-zA-Z]/;
  const decimalReg = /\./;
  if (alphaReg.test(content)) {
    throw new AppError(`Item ${variableName} must be an integer not a character or alphanumeric characters`, 400);
  } else if (decimalReg.test(content)) {
    throw new AppError(`Item ${variableName} must be an integer not decimal`, 400);
  }
};
