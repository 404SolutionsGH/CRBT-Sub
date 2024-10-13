import { DataTypes } from "sequelize";
import { sequelize } from "../connectDb";
import { SubAdminPlans } from "../../../domain/entities/SubAdminplans";

export const defineSubAdminPlansTable = () => {
  SubAdminPlans.init(
    {
      id: {
        type: DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
      },
      planId: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        validate: {
          notNull: { msg: "No data passed planId" },
          isInt: { msg: "the value passed for planId must be an integer" },
        },
      },
      subscriberId: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        references: { model: "Admins", key: "id" },
        validate: {
          notNull: { msg: "No data passed subscriberId" },
          isInt: { msg: "the value passed for subscriberId must be an integer" },
        },
      },
      price: {
        type: DataTypes.STRING(),
        allowNull: false,
        validate: {
          notNull: { msg: "No data passed price" },
        },
      },
      isSubValid: {
        type: DataTypes.BOOLEAN(),
        defaultValue: true,
      },
      subscriptionDate: DataTypes.DATE(),
      unSubscriptionDate: DataTypes.DATE(),
    },
    { sequelize: sequelize, tableName: "SubAdminPlans", timestamps: true, createdAt: "subscriptionDate", updatedAt: "unSubscriptionDate" }
  );
};
