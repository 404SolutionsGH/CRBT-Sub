// This file holds all the custome data types been used 
import mongoose,{Types} from "mongoose";


// SubService(Sub=subscribe)
interface SubService {
  subServiceId: Types.ObjectId;
  songId?: Types.ObjectId;
  date?:string;
  billing:string;
  nextSubPayment?:string;
}


// unsubService(unsub=unsubscribe)
interface unsubService {
  subServiceId: Types.ObjectId;
  songId?: Types.ObjectId;
  startDate?: string;
  billing: string;
  endDate:string
}

