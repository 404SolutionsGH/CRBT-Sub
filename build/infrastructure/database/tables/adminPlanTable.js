"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineAdminPlanTable = void 0;
const sequelize_1 = require("sequelize");
const AdminPlan_1 = require("../../../domain/entities/AdminPlan");
const connectDb_1 = require("../connectDb");
const defineAdminPlanTable = () => {
    AdminPlan_1.AdminPlan.init({
        planId: { type: sequelize_1.DataTypes.INTEGER(), autoIncrement: true, primaryKey: true },
        planType: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            validate: {
                notNull: { msg: "No data passed for planType" },
                notEmpty: { msg: "planType cannot be an empty string" },
            },
        },
        price: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            validate: {
                notNull: { msg: "No data passed for price" },
                notEmpty: { msg: "price cannot be an empty string" },
            },
        },
        subType: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            validate: {
                notNull: { msg: "No data passed for subType" },
                notEmpty: { msg: "subType cannot be an empty string" },
                isIn: { msg: "{VALUE} is not a valid value for subType. valid value are monthly yearly.", args: [["monthly", "yearly"]] },
            },
        },
        planName: {
            type: sequelize_1.DataTypes.STRING(),
            defaultValue: "CRBT-Plans",
            validate: {
                notEmpty: { msg: "planName cannot be an empty string" },
            },
        },
        benefits: sequelize_1.DataTypes.JSON(),
        deleteFlag: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false }
    }, { sequelize: connectDb_1.sequelize, tableName: "AdminPlans", timestamps: false });
};
exports.defineAdminPlanTable = defineAdminPlanTable;
