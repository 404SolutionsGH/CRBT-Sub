import { DataTypes } from "sequelize";
import { AdminPlan } from "../../../domain/entities/AdminPlan"
import { sequelize } from "../connectDb";
import { Admin } from "../../../domain/entities/Admin";



export const defineAdminPlanTable= ()=>{
    AdminPlan.init(
      {
        planId: { type: DataTypes.INTEGER(), autoIncrement: true, primaryKey: true },
        planType: {
          type: DataTypes.STRING(),
          allowNull: false,
          validate: {
            notNull: { msg: "No data passed for planType" },
            notEmpty: { msg: "planType cannot be an empty string" },
          },
        },

        price: {
          type: DataTypes.STRING(),
          allowNull: false,
          validate: {
            notNull: { msg: "No data passed for price" },
            notEmpty: { msg: "price cannot be an empty string" },
          },
        },
        subType: {
          type: DataTypes.STRING(),
          allowNull: false,
          validate: {
            notNull: { msg: "No data passed for subType" },
            notEmpty: { msg: "subType cannot be an empty string" },
            isIn: { msg: "{VALUE} is not a valid value for subType. valid value are monthly yearly.", args: [["monthly", "yearly"]] },
          },
        },
        planName: {
          type: DataTypes.STRING(),
            defaultValue:"CRBT-Plans",
          validate: {
            notEmpty: { msg: "planName cannot be an empty string" },
          },
        },
        benefits:DataTypes.JSON(),
        deleteFlag:{type:DataTypes.BOOLEAN,defaultValue:false}
      },
      { sequelize: sequelize, tableName: "AdminPlans", timestamps: false }
    );
}