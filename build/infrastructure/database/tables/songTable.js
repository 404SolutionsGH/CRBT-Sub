"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineSongTable = void 0;
const sequelize_1 = require("sequelize");
const Song_1 = require("../../../domain/entities/Song");
const connectDb_1 = require("../connectDb");
const defineSongTable = () => {
    Song_1.Song.init({
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
        songTitle: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            validate: {
                notNull: { msg: "No value passed for songTitle" },
                notEmpty: { msg: "songTitle cannot contain an empty string" },
            },
        },
        artisteName: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            validate: {
                notNull: { msg: "No value passed for artisteName" },
                notEmpty: { msg: "artisteName cannot contain an empty string" },
            },
        },
        albumName: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: true,
            validate: {
                notEmpty: { msg: "albumName cannot contain an empty string" },
            },
        },
        ussdCode: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            validate: {
                notNull: { msg: "No value passed for ussdCode" },
                notEmpty: { msg: "ussdCode cannot contain an empty string" },
            },
        },
        registrationUssdCode: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            validate: {
                notNull: { msg: "No value passed for registrationUssdCode" },
                notEmpty: { msg: "registrationUssdCode cannot contain an empty string" },
            },
        },
        price: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            validate: {
                notNull: { msg: "No value passed for price" },
                notEmpty: { msg: "price cannot contain an empty string" },
            },
        },
        category: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            validate: {
                notNull: { msg: "No value passed for category" },
                notEmpty: { msg: "category cannot contain an empty string" },
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
        lang: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            validate: {
                notNull: { msg: "No value passed for lang" },
                notEmpty: { msg: "lang cannot contain an empty string" },
            },
        },
        profile: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            validate: {
                notNull: { msg: "No value passed for profile" },
                notEmpty: { msg: "profile cannot contain an empty string" },
            },
        },
        subscriptionType: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            validate: {
                notNull: { msg: "No value passed for subscriptionType" },
                notEmpty: { msg: "subscriptionType cannot contain an empty string" },
                isIn: { msg: "Value for subscriptionType should be either weekly monthly or by_weekly ", args: [["weekly", "monthly", "by_weekly"]] },
            },
        },
        numberOfSubscribers: {
            type: sequelize_1.DataTypes.INTEGER(),
            defaultValue: 0,
        },
        numberOfListeners: {
            type: sequelize_1.DataTypes.INTEGER(),
            defaultValue: 0,
        },
        deleteFlag: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
    }, { sequelize: connectDb_1.sequelize, tableName: "Songs", timestamps: true });
};
exports.defineSongTable = defineSongTable;
