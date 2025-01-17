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
exports.SongRepoImpl = void 0;
const sequelize_1 = require("sequelize");
const AppError_1 = require("../../domain/entities/AppError");
const Song_1 = require("../../domain/entities/Song");
const Admin_1 = require("../../domain/entities/Admin");
class SongRepoImpl {
    saveSong(songData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ownerId, songTitle, albumName, artisteName, lang, ussdCode, price, category, tune, profile, subscriptionType, registrationUssdCode } = songData;
            const [itemCreated, isCreated] = yield Song_1.Song.findOrCreate({
                where: { ownerId, songTitle, lang, subscriptionType },
                defaults: {
                    ownerId,
                    songTitle,
                    albumName,
                    artisteName,
                    lang,
                    ussdCode,
                    price,
                    category,
                    tune,
                    profile,
                    subscriptionType,
                    registrationUssdCode,
                },
            });
            if (isCreated)
                return itemCreated;
            throw new AppError_1.AppError("This song has already been uploaded", 409);
        });
    }
    updateSongInfo(songData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, ownerId, songTitle, albumName, artisteName, lang, ussdCode, price, category, subscriptionType, registrationUssdCode, tune, profile } = songData;
            const updatedSongInfo = yield Song_1.Song.update({ songTitle, albumName, artisteName, lang, ussdCode, price, category, subscriptionType, registrationUssdCode, profile, tune }, { where: { id, ownerId }, returning: true });
            if (updatedSongInfo[0] === 1)
                return updatedSongInfo[1][0];
            return null;
        });
    }
    findSongById(id_1) {
        return __awaiter(this, arguments, void 0, function* (id, ownerIdFlag = false) {
            if (ownerIdFlag)
                return Song_1.Song.findByPk(id, { attributes: { exclude: ["updatedAt"] } });
            return yield Song_1.Song.findByPk(id, { attributes: { exclude: ["ownerId", "updatedAt"] } });
        });
    }
    findSongsByOwnersId(ownerId_1) {
        return __awaiter(this, arguments, void 0, function* (ownerId, isSuperAdmin = false) {
            if (isSuperAdmin) {
                const results = yield Admin_1.Admin.findAll({ where: { adminType: "system" }, attributes: ["id"] });
                const allSystemAdminIds = results.map(item => item.id);
                return yield Song_1.Song.findAll({ where: { ownerId: { [sequelize_1.Op.in]: allSystemAdminIds } } });
            }
            return yield Song_1.Song.findAll({ where: { ownerId } });
        });
    }
    getAllSongs() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Song_1.Song.findAll({ attributes: { exclude: ["ownerId", "updatedAt"] }, where: { deleteFlag: false } });
        });
    }
    increaseNumberOfSubscribers(ammount_1, id_1) {
        return __awaiter(this, arguments, void 0, function* (ammount, id, flag = null) {
            if (flag)
                yield Song_1.Song.decrement("numberOfSubscribers", { by: ammount, where: { id } });
            else
                yield Song_1.Song.increment("numberOfSubscribers", { by: ammount, where: { id } });
        });
    }
    increaseNumberOfListeners(amount_1, id_1) {
        return __awaiter(this, arguments, void 0, function* (amount, id, url = null) {
            // console.log(`Song url=${url}`);
            if (id === 0 && url)
                yield Song_1.Song.increment("numberOfListeners", { by: amount, where: { tune: { [sequelize_1.Op.like]: `%${url}` } } });
            else
                yield Song_1.Song.increment("numberOfListeners", { by: amount, where: { id } });
        });
    }
    deleteSongById(songId) {
        return __awaiter(this, void 0, void 0, function* () {
            const numDeleted = yield Song_1.Song.destroy({ where: { id: songId } });
            if (numDeleted === 1)
                return true;
            return false;
        });
    }
    flagSongForDeletion(songId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [numOfFlaged] = yield Song_1.Song.update({ deleteFlag: true }, { where: { id: songId } });
            if (numOfFlaged === 1)
                return true;
            return false;
        });
    }
}
exports.SongRepoImpl = SongRepoImpl;
