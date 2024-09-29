import { DataTypes } from "sequelize";
import { Service } from "../../../domain/entities/Service"
import { sequelize } from "../connectDb";




export const defineServiceTable= ()=>{

    Service.init(
      {
        ownerId: {
          type: DataTypes.INTEGER(),
          primaryKey: true,
          allowNull: false,
          validate: {
            notNull: { msg: "ownerId must contain a value" },
            isInt: { msg: "ownerId must be a integer value" },
          },
        },

        serviceName: {
          type: DataTypes.STRING(),
          allowNull: false,
          unique: { msg: "The serviceName {VALUE} already exist please select a different name", name: "ServiceName" },
          validate: {
            notNull: { msg: "No value passed for serviceName" },
          },
        },

        planeType: {
          type: DataTypes.STRING(),
          defaultValue: "basic",
          validate: {
            isIn: { msg: "The value for planType should be either of the following basic standard premium not {VALUE}", args: [["basic", "standard", "premium"]] },
          },
        },
        songs: DataTypes.ARRAY(DataTypes.INTEGER),
        albums: DataTypes.ARRAY(DataTypes.STRING),
        category: {
          type: DataTypes.STRING(),
          allowNull: false,
          validate: {
            notNull: { msg: "No value passed for category" },
            notEmpty:{msg:"category cannot contain an empty string"}
          },
        },
        numOfSubscribers: {
          type: DataTypes.ARRAY(DataTypes.INTEGER),
        },
      },
      { sequelize: sequelize, tableName: "Services", timestamps: true }
    );
}