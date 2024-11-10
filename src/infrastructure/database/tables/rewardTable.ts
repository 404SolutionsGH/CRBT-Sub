import { DataTypes } from "sequelize";
import { Reward } from "../../../domain/entities/Reward";
import { sequelize } from "../connectDb";

export const defineRewardTable = () => {
  Reward.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      accountId: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      accountType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      points: {
        type: DataTypes.INTEGER,
        defaultValue:0,
      },
    },
    { sequelize: sequelize, tableName: "Rewards", timestamps: true, createdAt: true, updatedAt: false }
  );
};
