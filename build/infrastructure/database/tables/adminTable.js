"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineAdminTable = void 0;
const sequelize_1 = require("sequelize");
const Admin_1 = require("../../../domain/entities/Admin");
const connectDb_1 = require("../connectDb");
const AdminPlan_1 = require("../../../domain/entities/AdminPlan");
const defineAdminTable = () => {
    Admin_1.Admin.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER(),
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            validate: {
                notNull: { msg: "No value passed for firstName is request body" },
                notEmpty: { msg: "firstName value is an empty string" },
            },
        },
        lastName: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            validate: {
                notNull: { msg: "No value passed for lastName is request body" },
                notEmpty: { msg: "lastName value is an empty string" },
            },
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
        password: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            validate: {
                notNull: { msg: "No value passed for password is request body" },
                notEmpty: { msg: "password value is an empty string" },
            },
        },
        adminType: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            validate: {
                notNull: { msg: "No value passed for adminType is request body" },
                notEmpty: { msg: "adminType value is an empty string" },
                isIn: { args: [["merchant", "system"]], msg: "Value for adminType should be merchant or system not {VALUE}" },
            },
        },
        planId: {
            type: sequelize_1.DataTypes.INTEGER(),
            defaultValue: 0,
            references: {
                model: AdminPlan_1.AdminPlan,
                key: "planId"
            }
        },
        nextSubPayment: {
            type: sequelize_1.DataTypes.DATEONLY(),
            allowNull: true,
            validate: {
                isDate: { msg: "nextSubPayment should be string in the data format yy-mm-dd", args: true }
            }
        }
    }, { sequelize: connectDb_1.sequelize, tableName: "Admins", timestamps: false });
    //  setting up associations
    Admin_1.Admin.belongsTo(AdminPlan_1.AdminPlan, { foreignKey: "planId" });
};
exports.defineAdminTable = defineAdminTable;
