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
    updateAdminAccount(updatedInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email, id, password } = updatedInfo;
            const updatedData = password ? yield Admin_1.Admin.update({ password }, { where: { id }, returning: true }) : yield Admin_1.Admin.update({ firstName, lastName, email }, { where: { id }, returning: true });
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
}
exports.AdminRepoImp = AdminRepoImp;
