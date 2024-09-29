import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AppError } from "../../domain/entities/AppError";
import { checkPathExists } from "../../@common/helperMethods/path";
import { readFile } from "fs/promises";

export const getFileFromSys = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  console.log("getting a file from system....");
  const { fileName } = req.params;
  const path = `${__dirname.replace("\\build\\interface\\middleware", `\\songsData\\${fileName}`)}`;
   console.log("Checking if the file exist....");  
  if (!(await checkPathExists(path))) {
     console.log("File does not exist");
     throw new AppError("file does not exist",404)
  }
   console.log("File exist");
   req.body.path= path
   next()
});
