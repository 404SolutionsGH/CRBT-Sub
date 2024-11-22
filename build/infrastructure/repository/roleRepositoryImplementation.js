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
exports.RoleRepoImpl = void 0;
const AppError_1 = require("../../domain/entities/AppError");
const Role_1 = require("../../domain/entities/Role");
class RoleRepoImpl {
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Role_1.Role.findAll();
        });
    }
    create(roleData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, allowedPages } = roleData;
            const [itemCreated, isCreated] = yield Role_1.Role.findOrCreate({ where: { name }, defaults: { name, allowedPages } });
            if (isCreated)
                return itemCreated;
            return null;
        });
    }
    findByName(roleName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Role_1.Role.findOne({ where: { name: roleName } });
        });
    }
    update(roleData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, allowedPages } = roleData;
            const numOfUpdated = yield Role_1.Role.update({ allowedPages }, { where: { name } });
            if (numOfUpdated[0] === 1)
                return true;
            return false;
        });
    }
    delete(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const numOfDel = yield Role_1.Role.destroy({ where: { name } });
            if (numOfDel === 1)
                return true;
            return false;
        });
    }
    checkedAllowedPages(allowedPages) {
        const validPages = ["Packages", "UserManagement", "Rewards", "Dashboard", "Payments", "Uploads", "SubscriptionPlans", "CRBTAds"];
        allowedPages.forEach((page) => {
            if (!validPages.includes(page)) {
                throw new AppError_1.AppError(`The value ${page} is not a valid value for allowedPages`, 400);
            }
        });
    }
}
exports.RoleRepoImpl = RoleRepoImpl;
