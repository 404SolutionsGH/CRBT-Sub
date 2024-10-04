import { Model } from "sequelize";


export class SubSongs extends Model{
declare id:number;
declare songOwnerId:number;
declare subscriberId:number;
declare subscriptionDate:string;
declare price:string;
declare isSubValid:boolean;
declare unSubscriptionDate:string;
}