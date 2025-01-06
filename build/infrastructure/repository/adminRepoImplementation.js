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
const sequelize_1 = require("sequelize");
const Admin_1 = require("../../domain/entities/Admin");
class AdminRepoImp {
    createAdmin(adminData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, firstName, lastName, adminType, role } = adminData;
            const [itemCreated, isCreated] = role
                ? yield Admin_1.Admin.findOrCreate({
                    where: { email },
                    defaults: {
                        email,
                        password,
                        firstName,
                        lastName,
                        adminType,
                        role,
                    },
                })
                : yield Admin_1.Admin.findOrCreate({
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
    setUpPaymentData(planId, nextSubPayment, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [numOfRows] = yield Admin_1.Admin.update({ planId, nextSubPayment }, { where: { id } });
            if (numOfRows == 1)
                return true;
            return false;
        });
    }
    getAllMerchants() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Admin_1.Admin.findAll({ where: { adminType: "merchant" } });
        });
    }
    getAllSystemAdmins() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Admin_1.Admin.findAll({ where: { adminType: "system", role: { [sequelize_1.Op.ne]: null } }, attributes: { exclude: ["password"] } });
        });
    }
    updateAdminAccount(updatedInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email, id, password, planId, role, profile } = updatedInfo;
            const updatedData = password && !email && !firstName && !lastName && !planId
                ? yield Admin_1.Admin.update({ password }, { where: { id }, returning: true })
                : planId
                    ? yield Admin_1.Admin.update({ firstName, lastName, email, planId }, { where: { id }, returning: true })
                    : role
                        ? yield Admin_1.Admin.update({ firstName, lastName, email, role }, { where: { id }, returning: true })
                        : yield Admin_1.Admin.update({ firstName, lastName, email, profile }, { where: { id }, returning: true });
            if (updatedData[0] === 1)
                return updatedData[1][0];
            return null;
        });
    }
    getAllMerchnatsByPlanId(planId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Admin_1.Admin.findAll({ where: { adminType: "merchant", planId } });
        });
    }
    deleteAccount(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const numOfDeleted = yield Admin_1.Admin.destroy({ where: { id: accountId } });
            if (numOfDeleted !== 0)
                return true;
            return false;
        });
    }
}
exports.AdminRepoImp = AdminRepoImp;
