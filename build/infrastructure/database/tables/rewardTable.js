"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineRewardTable = void 0;
const sequelize_1 = require("sequelize");
const Reward_1 = require("../../../domain/entities/Reward");
const connectDb_1 = require("../connectDb");
const defineRewardTable = () => {
    Reward_1.Reward.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        accountId: {
            type: sequelize_1.DataTypes.INTEGER,
            unique: true,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        accountType: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        points: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 0,
        },
    }, { sequelize: connectDb_1.sequelize, tableName: "Rewards", timestamps: true, createdAt: true, updatedAt: false });
};
exports.defineRewardTable = defineRewardTable;
