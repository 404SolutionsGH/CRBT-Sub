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
exports.UserRepoImp = void 0;
const User_1 = require("../../domain/entities/User");
class UserRepoImp {
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.User.findAll();
        });
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { phone, langPref, firstName, lastName } = userData;
            const [itemCreated, isCreated] = yield User_1.User.findOrCreate({
                where: { phone },
                defaults: {
                    phone,
                    langPref,
                    firstName,
                    lastName,
                },
            });
            if (isCreated) {
                return itemCreated;
            }
            return null;
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.User.findByPk(id);
        });
    }
    findUserByPhone(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.User.findOne({ where: { phone } });
        });
    }
    updateAccountInfo(account) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, id, accountBalance, phone, langPref, profile, location, email } = account;
            const updatedData = yield User_1.User.update({ firstName, accountBalance, phone, langPref, lastName, profile, location, email }, { where: { id }, returning: true });
            if (updatedData[0] == 1)
                return updatedData[1][0];
            return null;
        });
    }
    updateSubSongId(subSongId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedData = yield User_1.User.update({ subSongId }, { where: { id } });
            if (updatedData[0] == 1)
                return true;
            return false;
        });
    }
    getAllUserBySubSongId(songId) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.User.findAll({ where: { subSongId: songId } });
        });
    }
    deleteAccount(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const numOfDeleted = yield User_1.User.destroy({ where: { id: accountId } });
            if (numOfDeleted !== 0)
                return true;
            return false;
        });
    }
}
exports.UserRepoImp = UserRepoImp;
