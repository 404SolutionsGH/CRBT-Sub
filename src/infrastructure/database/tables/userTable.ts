import { User } from "../../../domain/entities/User";
import { DataTypes } from "sequelize";
import { sequelize } from "../connectDb";

export const defineUserTable = () => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
      },
      phone: {
        type: DataTypes.STRING(),
        allowNull: false,
        validate: {
          notNull: {
            msg: "No value passed for phone",
          },
          notEmpty: { msg: "phone cannot be empty" },
        },
      },
      langPref: {
        type: DataTypes.STRING(),
        allowNull: false,
        validate: {
          notNull: {
            msg: "No value passed for langPref",
          },
          notEmpty: { msg: "langPref cannot be empty" },
        },
      },
      firstName: {
        type: DataTypes.STRING(),
        allowNull: true,
      },

      lastName: {
        type: DataTypes.STRING(),
        allowNull: true,
      },
      accountBalance:{
        type: DataTypes.STRING(),
        defaultValue:"0.00"
      },
      subSongId: {
        type: DataTypes.INTEGER(),
        defaultValue: 0,
      },
    },
    {
      sequelize: sequelize,
      tableName: "Users",
      timestamps: false,
    }
  );
};
