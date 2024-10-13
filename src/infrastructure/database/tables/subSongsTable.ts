import { DataTypes } from "sequelize";
import { SubSongs } from "../../../domain/entities/SubSongs";
import { sequelize } from "../connectDb";

export const defineSubSongsTable = () => {
  SubSongs.init(
    {
      id: {
        type: DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
      },
      songId: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        validate: {
          notNull: { msg: "No data passed songOwnerId" },
          isInt: { msg: "the value passed for songOwnerId must be an integer" },
        },
      },
      subscriberId: {
        type: DataTypes.INTEGER(),
        references:{model:"Users",key:"id"},
        allowNull: false,
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
    { sequelize: sequelize, tableName: "SubSongs", timestamps: true, createdAt: "subscriptionDate", updatedAt: "unSubscriptionDate" }
  );
};
