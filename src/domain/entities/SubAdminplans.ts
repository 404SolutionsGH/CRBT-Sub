import { Model } from "sequelize";


export class SubAdminPlans extends Model{
    declare id:number;
    declare planId:number;
    declare subscriberId:number;
    declare subscriptionDate:string;
    declare price:string;
    declare isSubValid:boolean;
    declare unSubscriptionDate:string;
}