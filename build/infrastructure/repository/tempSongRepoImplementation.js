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
const TempSong_1 = require("../../domain/entities/TempSong");
class TempSongRepoImpl {
    createTempSongs(songsData) {
        return __awaiter(this, void 0, void 0, function* () {
            songsData.forEach((items) => __awaiter(this, void 0, void 0, function* () {
                const { tune, ownerId } = items;
                // console.log(`tune=${items.tune},ownerId=${items.ownerId}`)
                yield TempSong_1.TempSong.create({ tune, ownerId });
            }));
        });
    }
    findTempSongsById(ownerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TempSong_1.TempSong.findAll({ where: { ownerId } });
        });
    }
    findTempSongById(songId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TempSong_1.TempSong.findByPk(songId);
        });
    }
}
exports.TempSongRepoImpl = TempSongRepoImpl;