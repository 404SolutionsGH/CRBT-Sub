"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineUserTable = void 0;
const User_1 = require("../../../domain/entities/User");
const sequelize_1 = require("sequelize");
const connectDb_1 = require("../connectDb");
const defineUserTable = () => {
    User_1.User.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER(),
            autoIncrement: true,
            primaryKey: true,
        },
        phone: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            validate: {
                notNull: {
                    msg: "No value passed for phone",
                },
                notEmpty: { msg: "phone cannot be empty" },
            },
        },
        langPref: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            validate: {
                notNull: {
                    msg: "No value passed for langPref",
                },
                notEmpty: { msg: "langPref cannot be empty" },
            },
        },
        firstName: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: true,
        },
        lastName: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: true,
        },
        accountBalance: {
            type: sequelize_1.DataTypes.STRING(),
            defaultValue: "0.00",
        },
        subSongId: {
            type: sequelize_1.DataTypes.INTEGER(),
            defaultValue: 0,
        },
        profile: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        sequelize: connectDb_1.sequelize,
        tableName: "Users",
        timestamps: true,
        createdAt: true,
        updatedAt: false,
    });
};
exports.defineUserTable = defineUserTable;
