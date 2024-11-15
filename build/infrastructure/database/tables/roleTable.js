"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineRoleTable = void 0;
const sequelize_1 = require("sequelize");
const Role_1 = require("../../../domain/entities/Role");
const connectDb_1 = require("../connectDb");
const defineRoleTable = () => {
    Role_1.Role.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
        allowedPages: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
            allowNull: false,
            validate: {
                isArray: { msg: "Values passed for allowedPages should be an array of string", args: true }
            }
        },
    }, { sequelize: connectDb_1.sequelize, tableName: "Roles", timestamps: true, createdAt: true, updatedAt: false });
};
exports.defineRoleTable = defineRoleTable;
