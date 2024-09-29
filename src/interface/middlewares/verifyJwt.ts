// Custom data types
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../libs/jwt";
import { AppError } from "../../domain/entities/AppError";

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  console.log("Jwt verification began....");
 if (req.headers !== undefined && req.headers.authorization !== undefined) {
   if (!req.headers.authorization.startsWith("Bearer ")) {
     res.status(400);
     throw new AppError("Bad Request Bearer schema not found in Header", 400);
   }

   const jwtData = verifyToken(req.headers.authorization.split(" ")[1]);
   if (!jwtData.userId) {
     throw new AppError("Token has expired or is not valid", 401);
   }
   console.log("Jwt token Verified");
   req.body.id = jwtData.userId;
 } else {
   throw new AppError("Authorization Header not defined", 400);
 }

 next();
};
