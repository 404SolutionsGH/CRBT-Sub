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
exports.RoleUseCases = void 0;
const AppError_1 = require("../../domain/entities/AppError");
const roleRepositoryImplementation_1 = require("../../infrastructure/repository/roleRepositoryImplementation");
class RoleUseCases {
    constructor() {
        this.roleRepo = new roleRepositoryImplementation_1.RoleRepoImpl();
    }
    createRole(roleData) {
        return __awaiter(this, void 0, void 0, function* () {
            this.roleRepo.checkedAllowedPages(roleData.allowedPages);
            const data = yield this.roleRepo.create(roleData);
            if (!data)
                throw new AppError_1.AppError(`The role ${roleData.name} already exist`, 409);
        });
    }
    updateRole(roleData) {
        return __awaiter(this, void 0, void 0, function* () {
            this.roleRepo.checkedAllowedPages(roleData.allowedPages);
            const data = yield this.roleRepo.update(roleData);
            if (!data)
                throw new AppError_1.AppError(`Update failed, the role ${roleData.name} does not exist`, 404);
        });
    }
    getRole(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.roleRepo.findByName(name);
            if (data)
                return data;
            throw new AppError_1.AppError(`No role with name ${name} exist`, 404);
        });
    }
    getAllRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.roleRepo.all();
        });
    }
    deleteRole(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const isDeleted = yield this.roleRepo.delete(name);
            if (!isDeleted)
                throw new AppError_1.AppError(`Deletion failed, no role with name ${name} exist`, 404);
        });
    }
}
exports.RoleUseCases = RoleUseCases;
