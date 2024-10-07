import { DataTypes } from "sequelize"
import { TempSong } from "../../../domain/entities/TempSong"
import { sequelize } from "../connectDb";



export const defineTempSongTable=()=>{

    TempSong.init(
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
        tune: {
          type: DataTypes.STRING(),
          allowNull: false,
          validate: {
            notNull: { msg: "No value passed for tune" },
            notEmpty: { msg: "tune cannot contain an empty string" },
          },
        },
        originalName: {
          type: DataTypes.STRING(),
          allowNull: false,
          validate: {
            notNull: { msg: "No value passed for originalName" },
            notEmpty: { msg: "originalName cannot contain an empty string" },
          },
        },
      },
      { sequelize: sequelize, tableName: "TempSongs", timestamps: true }
    );

}