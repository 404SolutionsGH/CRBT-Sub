import { Model } from "sequelize";

export class Reward extends Model{
    declare id:number;
    declare accountId:number;
    declare email?:string;
    declare phone?:string
    declare accountType:"user"|"admin";
    declare points:number;
}
