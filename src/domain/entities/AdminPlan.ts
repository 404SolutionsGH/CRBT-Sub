import { Model } from "sequelize";


export class AdminPlan extends Model{
declare planId:number;
declare planType:string;
declare price:string;
declare subType:"monthly"|"yearly";
declare planName:string;
declare benefits:object;
}