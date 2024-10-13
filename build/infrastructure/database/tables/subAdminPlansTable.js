"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineSubAdminPlansTable = void 0;
const sequelize_1 = require("sequelize");
const connectDb_1 = require("../connectDb");
const SubAdminplans_1 = require("../../../domain/entities/SubAdminplans");
const defineSubAdminPlansTable = () => {
    SubAdminplans_1.SubAdminPlans.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER(),
            autoIncrement: true,
            primaryKey: true,
        },
        planId: {
            type: sequelize_1.DataTypes.INTEGER(),
            allowNull: false,
            validate: {
                notNull: { msg: "No data passed planId" },
                isInt: { msg: "the value passed for planId must be an integer" },
            },
        },
        subscriberId: {
            type: sequelize_1.DataTypes.INTEGER(),
            allowNull: false,
            references: { model: "Admins", key: "id" },
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
    }, { sequelize: connectDb_1.sequelize, tableName: "SubAdminPlans", timestamps: true, createdAt: "subscriptionDate", updatedAt: "unSubscriptionDate" });
};
exports.defineSubAdminPlansTable = defineSubAdminPlansTable;
