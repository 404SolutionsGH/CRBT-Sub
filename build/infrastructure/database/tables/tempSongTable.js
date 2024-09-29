"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineTempSongTable = void 0;
const sequelize_1 = require("sequelize");
const TempSong_1 = require("../../../domain/entities/TempSong");
const connectDb_1 = require("../connectDb");
const defineTempSongTable = () => {
    TempSong_1.TempSong.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER(),
            autoIncrement: true,
            primaryKey: true,
        },
        ownerId: {
            type: sequelize_1.DataTypes.INTEGER(),
            allowNull: false,
            validate: {
                notNull: { msg: "ownerId must contain a value" },
                isInt: { msg: "ownerId must be a integer value" },
            },
        },
        tune: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            validate: {
                notNull: { msg: "No value passed for tune" },
                notEmpty: { msg: "tune cannot contain an empty string" },
            },
        },
    }, { sequelize: connectDb_1.sequelize, tableName: "TempSongs", timestamps: true });
};
exports.defineTempSongTable = defineTempSongTable;
