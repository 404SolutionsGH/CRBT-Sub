"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = void 0;
const jwt_1 = require("../../libs/jwt");
const AppError_1 = require("../../domain/entities/AppError");
const verifyJwt = (req, res, next) => {
    console.log("Jwt verification began....");
    try {
        if (req.headers !== undefined && req.headers.authorization !== undefined) {
            if (!req.headers.authorization.startsWith("Bearer ")) {
                res.status(400);
                throw new AppError_1.AppError("Bad Request Bearer schema not found in Header", 400);
            }
            const jwtData = (0, jwt_1.verifyToken)(req.headers.authorization.split(" ")[1]);
            if (!jwtData.userId) {
                throw new AppError_1.AppError("Token has expired or is not valid", 401);
            }
            console.log("Jwt token Verified");
            req.body.id = jwtData.userId;
        }
        else {
            throw new AppError_1.AppError("Authorization Header not defined", 400);
        }
        next();
    }
    catch (error) {
        throw new AppError_1.AppError(`${error.message}`, 500);
    }
};
exports.verifyJwt = verifyJwt;
