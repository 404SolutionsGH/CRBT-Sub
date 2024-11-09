import { DataTypes } from "sequelize";
import { Ads } from "../../../domain/entities/Ads"
import { sequelize } from "../connectDb";


export const defineAdsTable=()=>{
    Ads.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },

        title: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: { msg: "No value passed for title" },
            notEmpty: { msg: "title cannot contain an empty string" },
          },
        },

        description: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: { msg: "No value passed for description" },
            notEmpty: { msg: "description cannot contain an empty string" },
          },
        },
        image: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
            notNull: { msg: "No value passed for image" },
            notEmpty: { msg: "image cannot contain an empty string" },
          },
        },
        url: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: { msg: "No value passed for url" },
            notEmpty: { msg: "url cannot contain an empty string" },
            isUrl: { msg: "url must be in the format https://example.com" },
          },
        },
        expiryDate: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: { msg: "No value passed for expiryDate" },
            notEmpty: { msg: "expiryDate cannot contain an empty string" },
          },
        },
      },
      { sequelize: sequelize, tableName: "Ads", timestamps: true, createdAt: true, updatedAt: false }
    );
}