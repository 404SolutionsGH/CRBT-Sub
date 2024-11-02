import { Transaction } from "../../domain/entities/Transactions";
import { TransactionRespository } from "../../domain/interfaces/transactionRespository";



export class TransactionRepoImpl implements TransactionRespository{
    async createTransaction(transactionDetails: Transaction): Promise<Transaction> {
        const{email,planId,state}=transactionDetails
       return await Transaction.create({email,planId,state}) 
    }
    async findTransactionById(id: number): Promise<Transaction | null> {
        return await Transaction.findByPk(id)
    }
    
}