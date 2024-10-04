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
const AppError_1 = require("../../domain/entities/AppError");
const Song_1 = require("../../domain/entities/Song");
class SongRepoImpl {
    saveSong(songData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, ownerId, songTitle, albumName, artisteName, lang, ussdCode, price, category, tune, profile, subscriptionType } = songData;
            const [itemCreated, isCreated] = yield Song_1.Song.findOrCreate({
                where: { ownerId, songTitle, lang, subscriptionType },
                defaults: {
                    id,
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
                },
            });
            if (isCreated)
                return itemCreated;
            throw new AppError_1.AppError("This song has already been uploaded", 409);
        });
    }
    findSongById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Song_1.Song.findByPk(id);
        });
    }
    findSongsByOwnersId(ownerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Song_1.Song.findAll({ where: { ownerId } });
        });
    }
    getAllSongs() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Song_1.Song.findAll({ attributes: { exclude: ["ownerId", "updatedAt"] } });
        });
    }
    increaseNumberOfSubscribers(ammount, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Song_1.Song.increment("numberOfSubscribers", { by: ammount, where: { id } });
        });
    }
    increaseNumberOfListeners(ammount, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Song_1.Song.increment("numberOfListeners", { by: ammount, where: { id } });
        });
    }
}
exports.SongRepoImpl = SongRepoImpl;
