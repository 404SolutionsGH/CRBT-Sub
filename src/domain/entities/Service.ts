import { Model } from "sequelize";


export class Service extends Model{
    declare ownerId:number;
    declare serviceName:string;
    declare planeType:string;
    declare songs:Array<number>;
    declare albums:Array<string>
    declare category:string;
    declare numOfSubscribers:number;
}