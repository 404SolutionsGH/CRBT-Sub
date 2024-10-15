import { Model } from "sequelize";


export class PackageCategory extends Model {
    declare id:number;
    declare title:string;
    declare description:string;
}