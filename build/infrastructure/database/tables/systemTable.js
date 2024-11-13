"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineSystemTable = void 0;
const sequelize_1 = require("sequelize");
const System_1 = require("../../../domain/entities/System");
const connectDb_1 = require("../connectDb");
const defineSystemTable = () => {
    System_1.System.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        adminId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        status: {
            type: sequelize_1.DataTypes.STRING,
            defaultValue: "Active",
            validate: {
                isIn: { msg: "Values passed for status is either Active or Maintainance", args: [["Active", "Maintainance"]] },
            },
        },
        chapaSecretKey: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        pointSettings: {
            type: sequelize_1.DataTypes.JSON,
            allowNull: false,
        },
    }, { sequelize: connectDb_1.sequelize, tableName: "System", timestamps: false });
};
exports.defineSystemTable = defineSystemTable;
