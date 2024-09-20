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
    updateFirstName(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, id } = data;
            const updatedData = yield User_1.User.update({ firstName }, { where: { id } });
            if (updatedData[0] == 1)
                return true;
            return false;
        });
    }
    updateLastName(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { lastName, id } = data;
            const updatedData = yield User_1.User.update({ lastName }, { where: { id } });
            if (updatedData[0] == 1)
                return true;
            return false;
        });
    }
}
exports.UserRepoImp = UserRepoImp;
