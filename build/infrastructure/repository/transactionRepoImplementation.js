"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRepoImpl = void 0;
const Transactions_1 = require("../../domain/entities/Transactions");
class TransactionRepoImpl {
    createTransaction(transactionDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, planId, state } = transactionDetails;
            return yield Transactions_1.Transaction.create({ email, planId, state });
        });
    }
    findTransactionById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Transactions_1.Transaction.findByPk(id);
        });
    }
}
exports.TransactionRepoImpl = TransactionRepoImpl;
