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
exports.createService = void 0;
const AppError_1 = require("../../domain/entities/AppError");
const adminRepoImplementation_1 = require("../../infrastructure/repository/adminRepoImplementation");
const serviceRepoImplementation_1 = require("../../infrastructure/repository/serviceRepoImplementation");
const createService = (ownerEmail, serviceInfo) => __awaiter(void 0, void 0, void 0, function* () {
    // find the admin with the provided email
    const { findAdminByEmail } = new adminRepoImplementation_1.AdminRepoImp();
    const adminAccount = yield findAdminByEmail(ownerEmail);
    if (!adminAccount)
        throw new AppError_1.AppError("No admin account with this email exist", 404);
    serviceInfo.ownerId = adminAccount.id;
    // creating service
    const { createService } = new serviceRepoImplementation_1.ServiceRepoImp();
    const newService = yield createService(serviceInfo);
    if (!newService)
        throw new AppError_1.AppError("This account is already associated with a service", 409);
});
exports.createService = createService;
