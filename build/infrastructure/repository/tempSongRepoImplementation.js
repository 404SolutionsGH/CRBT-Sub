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
exports.TempSongRepoImpl = void 0;
const sequelize_1 = require("sequelize");
const TempSong_1 = require("../../domain/entities/TempSong");
const Admin_1 = require("../../domain/entities/Admin");
class TempSongRepoImpl {
    createTempSongs(songsData) {
        return __awaiter(this, void 0, void 0, function* () {
            songsData.forEach((items) => __awaiter(this, void 0, void 0, function* () {
                const { tune, ownerId, originalName } = items;
                // console.log(`tune=${items.tune},ownerId=${items.ownerId}`)
                yield TempSong_1.TempSong.create({ tune, ownerId, originalName });
            }));
        });
    }
    findTempSongsByOwnersId(ownerId_1) {
        return __awaiter(this, arguments, void 0, function* (ownerId, isSuperAdmin = true) {
            if (isSuperAdmin) {
                const results = yield Admin_1.Admin.findAll({ where: { adminType: "system" }, attributes: ["id"] });
                const allSystemAdminIds = results.map((item) => item.id);
                return yield TempSong_1.TempSong.findAll({ where: { ownerId: { [sequelize_1.Op.in]: allSystemAdminIds } } });
            }
            return yield TempSong_1.TempSong.findAll({ where: { ownerId } });
        });
    }
    findTempSongById(songId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TempSong_1.TempSong.findByPk(songId);
        });
    }
    findByTuneAndDelete(tune) {
        return __awaiter(this, void 0, void 0, function* () {
            yield TempSong_1.TempSong.destroy({ where: { tune: { [sequelize_1.Op.like]: `%${tune}%` } } });
        });
    }
    deleteSong(songId) {
        return __awaiter(this, void 0, void 0, function* () {
            const numOfSongsDeleted = yield TempSong_1.TempSong.destroy({ where: { id: songId } });
            if (numOfSongsDeleted === 1)
                return true;
            return false;
        });
    }
}
exports.TempSongRepoImpl = TempSongRepoImpl;
