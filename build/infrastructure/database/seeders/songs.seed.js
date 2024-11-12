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
exports.SongSeeder = void 0;
const Song_1 = require("../../../domain/entities/Song");
const SongSeeder = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = [
        {
            id: 1,
            songTitle: "Calm Down",
            ownerId: 1,
            artisteName: "Rema",
            albumName: "Best Hits",
            ussdCode: "*123#",
            registrationUssdCode: "*456#",
            price: "5",
            category: "Hip-hop",
            tune: "https://crbtbackend.trotro.live/api/v1/songs/listen/N06mBCNRRUQn7kYwRsVV.mp3",
            lang: "English",
            profile: "https://crbtbackend.trotro.live/api/v1/songs/profile/lnnmZyyhdzOLYQg3fcpt.jpeg",
            subscriptionType: "monthly",
        },
    ];
    yield Song_1.Song.bulkCreate(data);
});
exports.SongSeeder = SongSeeder;
