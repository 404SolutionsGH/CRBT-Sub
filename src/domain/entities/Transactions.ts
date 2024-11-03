import { Model } from "sequelize";

export class Transaction extends Model {
    declare id:number;
    declare email:string;
    declare planId:number;
    declare state:"success"|"fail"|"pending";
}

export interface PaymentInfo {
  phoneNumber: string;
  callBackUrl: string;
  returnUrl: string;
  txRef: string;
  currency: "ETB" | " USD";
  amount: string;
}
