"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineTransactionTable = void 0;
const sequelize_1 = require("sequelize");
const connectDb_1 = require("../connectDb");
const Transactions_1 = require("../../../domain/entities/Transactions");
const defineTransactionTable = () => {
    Transactions_1.Transaction.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER(),
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            validate: {
                notNull: { msg: "No value passed for email is request body" },
                notEmpty: { msg: "email value is an empty string" },
                isEmail: { msg: "{VALUE} is not a valid email" },
            },
        },
        planId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: { msg: "No data passed for planId in request body" },
                isInt: { msg: "Data passed planId must be an integer" },
            },
        },
        state: {
            type: sequelize_1.DataTypes.STRING,
            defaultValue: "pending",
        },
    }, { sequelize: connectDb_1.sequelize, tableName: "Transactions", timestamps: true });
};
exports.defineTransactionTable = defineTransactionTable;
