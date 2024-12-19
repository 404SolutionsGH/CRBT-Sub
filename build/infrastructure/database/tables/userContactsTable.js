"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineUserContactsTable = void 0;
const sequelize_1 = require("sequelize");
const connectDb_1 = require("../connectDb");
const UserContacts_1 = require("../../../domain/entities/UserContacts");
const defineUserContactsTable = () => {
    UserContacts_1.UserContacts.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER(),
            autoIncrement: true,
            primaryKey: true,
        },
        ownerId: {
            type: sequelize_1.DataTypes.INTEGER(),
            unique: true,
            allowNull: false,
            validate: {
                notNull: { msg: "ownerId must contain a value" },
                isInt: { msg: "ownerId must be a integer value" },
            },
        },
        contacts: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
            defaultValue: [],
        },
    }, { sequelize: connectDb_1.sequelize, tableName: "UsersContacts", timestamps: true });
};
exports.defineUserContactsTable = defineUserContactsTable;
