import { DataTypes } from "sequelize";
import { sequelize } from "../connectDb";
import { PackageCategory } from "../../../domain/entities/PackageCategory";

export const definePackageCategoryTable = () => {

    PackageCategory.init(
      {
        id: {
          type: DataTypes.INTEGER(),
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING(),
          allowNull: false,
          validate: {
            notNull: { msg: "No value passed for title in body" },
            notEmpty: { msg: "title cannot contain an empty string" },
          },
        },
        description: {
          type: DataTypes.STRING(),
          allowNull: false,
          validate: {
            notNull: { msg: "No value passed for description in body" },
            notEmpty: { msg: "description cannot contain an empty string" },
          },
        },
      },
      { sequelize: sequelize, tableName: "PackageCategories", timestamps: false }
    );

}