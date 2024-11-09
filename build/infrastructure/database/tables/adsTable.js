"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineAdsTable = void 0;
const sequelize_1 = require("sequelize");
const Ads_1 = require("../../../domain/entities/Ads");
const connectDb_1 = require("../connectDb");
const defineAdsTable = () => {
    Ads_1.Ads.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "No value passed for title" },
                notEmpty: { msg: "title cannot contain an empty string" },
            },
        },
        description: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "No value passed for description" },
                notEmpty: { msg: "description cannot contain an empty string" },
            },
        },
        image: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: { msg: "No value passed for image" },
                notEmpty: { msg: "image cannot contain an empty string" },
            },
        },
        url: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "No value passed for url" },
                notEmpty: { msg: "url cannot contain an empty string" },
                isUrl: { msg: "url must be in the format https://example.com" },
            },
        },
        expiryDate: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "No value passed for expiryDate" },
                notEmpty: { msg: "expiryDate cannot contain an empty string" },
            },
        },
    }, { sequelize: connectDb_1.sequelize, tableName: "Ads", timestamps: true, createdAt: true, updatedAt: false });
};
exports.defineAdsTable = defineAdsTable;
