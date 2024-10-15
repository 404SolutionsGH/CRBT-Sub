"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.definePackageTable = void 0;
const sequelize_1 = require("sequelize");
const Package_1 = require("../../../domain/entities/Package");
const connectDb_1 = require("../connectDb");
const definePackageTable = () => {
    Package_1.Package.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER(),
            autoIncrement: true,
            primaryKey: true,
        },
        packageName: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            validate: {
                notNull: { msg: "No value passed for packageName in body" },
                notEmpty: { msg: "packageName cannot contain an empty string" },
            },
        },
        packageDescription: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            validate: {
                notNull: { msg: "No value passed for packageName in body" },
                notEmpty: { msg: "packageDescription cannot contain an empty string" },
            },
        },
        ussdCode: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            validate: {
                notNull: { msg: "No value passed for packageName in body" },
                notEmpty: { msg: "ussd cannot contain an empty string" },
            },
        },
        price: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            validate: {
                notNull: { msg: "No value passed for packageName in body" },
                notEmpty: { msg: "price cannot contain an empty string" },
            },
        },
        packageType: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            validate: {
                notNull: { msg: "No value passed for packageName in body" },
                is: { msg: "Values passed for packageType should be in forms like this 1D(ie 1 day) 2W(2 weeks) 3M(3 months) etc.", args: /^\d+[DWM]$/ },
            },
        },
        packageImg: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true,
            validate: {
                is: { msg: "Value passed for packageImg should be in base64 format", args: /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/ },
            },
        },
    }, { sequelize: connectDb_1.sequelize, tableName: "Packages", timestamps: false });
};
exports.definePackageTable = definePackageTable;
