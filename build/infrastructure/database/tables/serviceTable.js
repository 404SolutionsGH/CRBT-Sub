"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineServiceTable = void 0;
const sequelize_1 = require("sequelize");
const Service_1 = require("../../../domain/entities/Service");
const connectDb_1 = require("../connectDb");
const defineServiceTable = () => {
    Service_1.Service.init({
        ownerId: {
            type: sequelize_1.DataTypes.INTEGER(),
            primaryKey: true,
            allowNull: false,
            validate: {
                notNull: { msg: "ownerId must contain a value" },
                isInt: { msg: "ownerId must be a integer value" },
            },
        },
        serviceName: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            unique: { msg: "The serviceName {VALUE} already exist please select a different name", name: "ServiceName" },
            validate: {
                notNull: { msg: "No value passed for serviceName" },
            },
        },
        planeType: {
            type: sequelize_1.DataTypes.STRING(),
            defaultValue: "basic",
            validate: {
                isIn: { msg: "The value for planType should be either of the following basic standard premium not {VALUE}", args: [["basic", "standard", "premium"]] },
            },
        },
        songs: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.INTEGER()),
        albums: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING()),
        category: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            validate: {
                notNull: { msg: "No value passed for category" },
            },
        },
        numOfSubscribers: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.INTEGER()),
            defaultValue: 0,
        },
    }, { sequelize: connectDb_1.sequelize, tableName: "Services", timestamps: true });
};
exports.defineServiceTable = defineServiceTable;
