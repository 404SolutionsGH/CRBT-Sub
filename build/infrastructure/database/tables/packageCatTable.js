"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.definePackageCategoryTable = void 0;
const sequelize_1 = require("sequelize");
const connectDb_1 = require("../connectDb");
const PackageCategory_1 = require("../../../domain/entities/PackageCategory");
const definePackageCategoryTable = () => {
    PackageCategory_1.PackageCategory.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER(),
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            validate: {
                notNull: { msg: "No value passed for title in body" },
                notEmpty: { msg: "title cannot contain an empty string" },
            },
        },
        description: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            validate: {
                notNull: { msg: "No value passed for description in body" },
                notEmpty: { msg: "description cannot contain an empty string" },
            },
        },
    }, { sequelize: connectDb_1.sequelize, tableName: "PackageCategories", timestamps: false });
};
exports.definePackageCategoryTable = definePackageCategoryTable;
