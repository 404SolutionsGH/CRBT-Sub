"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineSubSongsTable = void 0;
const sequelize_1 = require("sequelize");
const SubSongs_1 = require("../../../domain/entities/SubSongs");
const connectDb_1 = require("../connectDb");
const defineSubSongsTable = () => {
    SubSongs_1.SubSongs.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER(),
            autoIncrement: true,
            primaryKey: true,
        },
        songId: {
            type: sequelize_1.DataTypes.INTEGER(),
            allowNull: false,
            validate: {
                notNull: { msg: "No data passed songOwnerId" },
                isInt: { msg: "the value passed for songOwnerId must be an integer" },
            },
        },
        subscriberId: {
            type: sequelize_1.DataTypes.INTEGER(),
            allowNull: false,
            validate: {
                notNull: { msg: "No data passed subscriberId" },
                isInt: { msg: "the value passed for subscriberId must be an integer" },
            },
        },
        price: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            validate: {
                notNull: { msg: "No data passed price" },
            },
        },
        isSubValid: {
            type: sequelize_1.DataTypes.BOOLEAN(),
            defaultValue: true,
        },
        subscriptionDate: sequelize_1.DataTypes.DATE(),
        unSubscriptionDate: sequelize_1.DataTypes.DATE(),
    }, { sequelize: connectDb_1.sequelize, tableName: "SubSongs", timestamps: true, createdAt: "subscriptionDate", updatedAt: "unSubscriptionDate" });
};
exports.defineSubSongsTable = defineSubSongsTable;
