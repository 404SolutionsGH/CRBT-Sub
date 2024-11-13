"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = void 0;
const jwt_1 = require("../../libs/jwt");
const AppError_1 = require("../../domain/entities/AppError");
const systemRepoImplementation_1 = require("../../infrastructure/repository/systemRepoImplementation");
const checkAccountType_1 = require("../../@common/helperMethods/checkAccountType");
const verifyJwt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Jwt verification began....");
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
        const { getSystemStatus } = new systemRepoImplementation_1.SystemRepoImpl();
        const systemStatus = yield getSystemStatus(undefined);
        if (systemStatus === "Active") {
            next();
        }
        else {
            if (yield (0, checkAccountType_1.isRequestFromSuperAdmin)(req.body.id)) {
                return next();
            }
            res.status(503).json({ message: "System is currently under maintainance" });
        }
    }
    else {
        throw new AppError_1.AppError("Authorization Header not defined", 400);
    }
});
exports.verifyJwt = verifyJwt;
