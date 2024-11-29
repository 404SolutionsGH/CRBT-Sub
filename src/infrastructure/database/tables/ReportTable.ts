import { DataTypes } from "sequelize";
import { Report } from "../../../domain/entities/Report"
import { sequelize } from "../connectDb";



export const defineReportTable=()=>{
    Report.init(
      {
        id: {
          type: DataTypes.INTEGER(),
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
        category: {
          type: DataTypes.STRING(),
          allowNull: false,
          validate: {
            notNull: { msg: "No value passed for category" },
            notEmpty: { msg: "category cannot contain an empty string" },
          },
        },
      },
      { sequelize: sequelize, tableName: "Reports", timestamps: true }
    );
}