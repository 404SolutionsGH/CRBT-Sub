import { DataTypes } from "sequelize";
import { Role } from "../../../domain/entities/Role"
import { sequelize } from "../connectDb";




export const defineRoleTable= ()=>{

    Role.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: { type: DataTypes.STRING, allowNull: false, unique: true },
        allowedPages: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull:false,
          validate:{
           isArray:{msg:"Values passed for allowedPages should be an array of string",args:true}
          }
        },
      },
      { sequelize: sequelize, tableName: "Roles", timestamps: true, createdAt: true, updatedAt: false }
    );
}