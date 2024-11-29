"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineReportTable = void 0;
const sequelize_1 = require("sequelize");
const Report_1 = require("../../../domain/entities/Report");
const connectDb_1 = require("../connectDb");
const defineReportTable = () => {
    Report_1.Report.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER(),
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
        category: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            validate: {
                notNull: { msg: "No value passed for category" },
                notEmpty: { msg: "category cannot contain an empty string" },
            },
        },
    }, { sequelize: connectDb_1.sequelize, tableName: "Reports", timestamps: true });
};
exports.defineReportTable = defineReportTable;
