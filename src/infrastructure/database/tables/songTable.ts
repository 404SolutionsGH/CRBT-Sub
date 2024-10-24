import { DataTypes } from "sequelize";
import { Song } from "../../../domain/entities/Song";
import { sequelize } from "../connectDb";

export const defineSongTable = () => {
  Song.init(
    {
      id: {
        type: DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
      },
      ownerId: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        validate: {
          notNull: { msg: "ownerId must contain a value" },
          isInt: { msg: "ownerId must be a integer value" },
        },
      },
      songTitle: {
        type: DataTypes.STRING(),
        allowNull: false,
        validate: {
          notNull: { msg: "No value passed for songTitle" },
          notEmpty: { msg: "songTitle cannot contain an empty string" },
        },
      },
      artisteName: {
        type: DataTypes.STRING(),
        allowNull: false,
        validate: {
          notNull: { msg: "No value passed for artisteName" },
          notEmpty: { msg: "artisteName cannot contain an empty string" },
        },
      },
      albumName: {
        type: DataTypes.STRING(),
        allowNull: true,
        validate: {
          notEmpty: { msg: "albumName cannot contain an empty string" },
        },
      },
      ussdCode: {
        type: DataTypes.STRING(),
        allowNull: false,
        validate: {
          notNull: { msg: "No value passed for ussdCode" },
          notEmpty: { msg: "ussdCode cannot contain an empty string" },
        },
      },
      price: {
        type: DataTypes.STRING(),
        allowNull: false,
        validate: {
          notNull: { msg: "No value passed for price" },
          notEmpty: { msg: "price cannot contain an empty string" },
        },
      },
      category: {
        type: DataTypes.STRING(),
        allowNull: false,
        validate: {
          notNull: { msg: "No value passed for category" },
          notEmpty: { msg: "category cannot contain an empty string" },
        },
      },

      tune: {
        type: DataTypes.STRING(),
        allowNull: false,
        validate: {
          notNull: { msg: "No value passed for tune" },
          notEmpty: { msg: "tune cannot contain an empty string" },
        },
      },
      lang: {
        type: DataTypes.STRING(),
        allowNull: false,
        validate: {
          notNull: { msg: "No value passed for lang" },
          notEmpty: { msg: "lang cannot contain an empty string" },
        },
      },
      profile: {
        type: DataTypes.STRING(),
        allowNull: false,
        validate: {
          notNull: { msg: "No value passed for profile" },
          notEmpty: { msg: "profile cannot contain an empty string" },
        },
      },
      subscriptionType: {
        type: DataTypes.STRING(),
        allowNull: false,
        validate: {
          notNull: { msg: "No value passed for subscriptionType" },
          notEmpty: { msg: "subscriptionType cannot contain an empty string" },
          isIn: { msg: "Value for subscriptionType should be either weekly monthly or by_weekly ", args: [["weekly", "monthly", "by_weekly"]] },
        },
      },

      numberOfSubscribers: {
        type: DataTypes.INTEGER(),
        defaultValue: 0,
      },
      numberOfListeners: {
        type: DataTypes.INTEGER(),
        defaultValue: 0,
      },
      deleteFlag: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    { sequelize: sequelize, tableName: "Songs", timestamps: true }
  );
};


