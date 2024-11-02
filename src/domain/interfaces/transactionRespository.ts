import { Transaction } from "../entities/Transactions";



export interface TransactionRespository{
    createTransaction(transactionDetails:Transaction):Promise<Transaction>;
    findTransactionById(id:number):Promise<Transaction|null>;
}