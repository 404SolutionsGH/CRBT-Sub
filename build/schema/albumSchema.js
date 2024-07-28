"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// the Album Schema
const albumSchema = new mongoose_1.default.Schema({
    name: String,
    artisteName: String,
    numOfSongs: Number,
    numOfListners: Number,
    numSubscribers: Number,
});
exports.AlbumSchema = mongoose_1.default.model("Album", albumSchema);
