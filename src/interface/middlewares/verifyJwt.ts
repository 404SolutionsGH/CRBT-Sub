// Custom data types
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { verifyToken } from "../../libs/jwt";
import { AppError } from "../../domain/entities/AppError";
import { SystemRepoImpl } from "../../infrastructure/repository/systemRepoImplementation";
import { isRequestFromSuperAdmin } from "../../@common/helperMethods/checkAccountType";

export const verifyJwt = asyncHandler(async (req: Request, res: Response,next:NextFunction) => {
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
      const { getSystemStatus } = new SystemRepoImpl();
      const systemStatus = await getSystemStatus(undefined);
      if (systemStatus === "Active") {
        next();
      } else {
        if (await isRequestFromSuperAdmin(req.body.id)) {
          return next();
        }
        res.status(503).json({ message: "System is currently under maintainance" });
      }
    } else {
      throw new AppError("Authorization Header not defined", 400);
    }
})