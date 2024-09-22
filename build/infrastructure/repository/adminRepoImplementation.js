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
exports.AdminRepoImp = void 0;
const Admin_1 = require("../../domain/entities/Admin");
class AdminRepoImp {
    createAdmin(adminData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, firstName, lastName, adminType } = adminData;
            const [itemCreated, isCreated] = yield Admin_1.Admin.findOrCreate({
                where: { email },
                defaults: {
                    email,
                    password,
                    firstName,
                    lastName,
                    adminType,
                },
            });
            if (isCreated)
                return itemCreated;
            return null;
        });
    }
    findAdminByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Admin_1.Admin.findOne({ where: { email } });
        });
    }
    findAdminById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Admin_1.Admin.findByPk(id);
        });
    }
}
exports.AdminRepoImp = AdminRepoImp;