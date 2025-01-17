import { DataTypes } from "sequelize";
import { Package } from "../../../domain/entities/Package";
import { sequelize } from "../connectDb";

export const definePackageTable = () => {
  Package.init(
    {
      id: {
        type: DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
      },
      packageCatId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "PackageCategories", key: "id" },
        validate: {
          notNull: { msg: "No value passed for packageCatId" },
          isInt: { msg: "Value for packageCatId must be an integer" },
        },
      },
      packageName: {
        type: DataTypes.STRING(),
        allowNull: false,
        validate: {
          notNull: { msg: "No value passed for packageName in body" },
          notEmpty: { msg: "packageName cannot contain an empty string" },
        },
      },
      packageDescription: {
        type: DataTypes.STRING(),
        allowNull: false,
        validate: {
          notNull: { msg: "No value passed for packageName in body" },
          notEmpty: { msg: "packageDescription cannot contain an empty string" },
        },
      },
      ussdCode: {
        type: DataTypes.STRING(),
        allowNull: false,
        validate: {
          notNull: { msg: "No value passed for packageName in body" },
          notEmpty: { msg: "ussd cannot contain an empty string" },
        },
      },
      price: {
        type: DataTypes.STRING(),
        allowNull: false,
        validate: {
          notNull: { msg: "No value passed for packageName in body" },
          notEmpty: { msg: "price cannot contain an empty string" },
        },
      },
      packageType: {
        type: DataTypes.STRING(),
        allowNull: false,
        validate: {
          notNull: { msg: "No value passed for packType in body" },
          isIn: { msg: "Values passed for packageType should be one of the following 'data' 'sms' 'voice' 'any' ", args: [["any", "voice", "sms", "data"]] },
        },
      },
      packageValidity: {
        type: DataTypes.STRING(),
        allowNull: false,
        validate: {
          notNull: { msg: "No value passed for packageValidity in body" },
          is: { msg: "Values passed for packageValidity should be in forms like this 1D(ie 1 day) 2W(2 weeks) 3M(3 months) etc.", args: /^\d+[DWMI]$/ },
        },
      },
      packageImg: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          is: { msg: "Value passed for packageImg should be in base64 format", args: /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/ },
        },
      },
    },
    { sequelize: sequelize, tableName: "Packages", timestamps: false }
  );
};
