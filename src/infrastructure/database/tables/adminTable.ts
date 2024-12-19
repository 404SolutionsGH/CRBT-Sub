import { DataTypes } from "sequelize";
import { Admin } from "../../../domain/entities/Admin";
import { sequelize } from "../connectDb";
import { AdminPlan } from "../../../domain/entities/AdminPlan";

export const defineAdminTable = () => {
  Admin.init(
    {
      id: {
        type: DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING(),
        allowNull: false,
        validate: {
          notNull: { msg: "No value passed for firstName is request body" },
          notEmpty: { msg: "firstName value is an empty string" },
        },
      },

      lastName: {
        type: DataTypes.STRING(),
        allowNull: false,
        validate: {
          notNull: { msg: "No value passed for lastName is request body" },
          notEmpty: { msg: "lastName value is an empty string" },
        },
      },
      email: {
        type: DataTypes.STRING(),
        allowNull: false,
        validate: {
          notNull: { msg: "No value passed for email is request body" },
          notEmpty: { msg: "email value is an empty string" },
          isEmail: { msg: "{VALUE} is not a valid email" },
        },
      },
      password: {
        type: DataTypes.STRING(),
        allowNull: false,
        validate: {
          notNull: { msg: "No value passed for password is request body" },
          notEmpty: { msg: "password value is an empty string" },
        },
      },
      adminType: {
        type: DataTypes.STRING(),
        allowNull: false,
        validate: {
          notNull: { msg: "No value passed for adminType is request body" },
          notEmpty: { msg: "adminType value is an empty string" },
          isIn: { args: [["merchant", "system"]], msg: "Value for adminType should be merchant or system not {VALUE}" },
        },
      },

      planId: {
        type: DataTypes.INTEGER(),
        defaultValue: 0,
      },
      nextSubPayment: {
        type: DataTypes.DATEONLY(),
        allowNull: true,
        validate: {
          isDate: { msg: "nextSubPayment should be string in the data format yy-mm-dd", args: true },
        },
      },

      role: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profile: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    { sequelize: sequelize, tableName: "Admins", timestamps: true, createdAt: true, updatedAt: false }
  );

  //  setting up associations
  // Admin.belongsTo(AdminPlan, { foreignKey: "planId" });
  // AdminPlan.hasMany(Admin, { foreignKey: "planId" });
};
