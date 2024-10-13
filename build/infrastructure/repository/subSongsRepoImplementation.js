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
exports.SubSongsRepoImp = void 0;
const sequelize_1 = require("sequelize");
const AppError_1 = require("../../domain/entities/AppError");
const SubSongs_1 = require("../../domain/entities/SubSongs");
const User_1 = require("../../domain/entities/User");
class SubSongsRepoImp {
    createSubscription(subDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const { price, songId, subscriberId } = subDetails;
            return yield SubSongs_1.SubSongs.create({ price, songId, subscriberId });
        });
    }
    findSubscriptionsBySubscriberId(subscriberId_1) {
        return __awaiter(this, arguments, void 0, function* (subscriberId, isSubValid = null, update = false) {
            if (update) {
                const updatedData = yield SubSongs_1.SubSongs.update({ isSubValid: false }, { where: { subscriberId, isSubValid }, returning: true });
                if (updatedData[0] === 1)
                    return updatedData[1][0];
                throw new AppError_1.AppError("User has already unsubscribed", 404);
            }
            else if (isSubValid === null)
                return yield SubSongs_1.SubSongs.findOne({ where: { subscriberId } });
            return yield SubSongs_1.SubSongs.findOne({ where: { subscriberId, isSubValid } });
        });
    }
    findSubscriptionById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SubSongs_1.SubSongs.findByPk(id);
        });
    }
    findSubscriptionBySongIds(songIds_1) {
        return __awaiter(this, arguments, void 0, function* (songIds, type = "sub") {
            if (type === "unSub")
                return yield SubSongs_1.SubSongs.findAll({ where: { songId: { [sequelize_1.Op.in]: songIds }, isSubValid: false }, include: User_1.User, attributes: { exclude: ["id", "subscriptionDate", "subscriberId"] } });
            return yield SubSongs_1.SubSongs.findAll({ where: { songId: { [sequelize_1.Op.in]: songIds }, isSubValid: true }, include: User_1.User, attributes: { exclude: ["id", "unSubscriptionDate", "subscriberId"] } });
        });
    }
}
exports.SubSongsRepoImp = SubSongsRepoImp;
