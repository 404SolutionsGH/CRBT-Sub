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
exports.confirmPayment = void 0;
const date_1 = require("../../@common/helperMethods/date");
const adminPlanRepoImplementation_1 = require("../../infrastructure/repository/adminPlanRepoImplementation");
const adminRepoImplementation_1 = require("../../infrastructure/repository/adminRepoImplementation");
const transactionRepoImplementation_1 = require("../../infrastructure/repository/transactionRepoImplementation");
const jwt_1 = require("../../libs/jwt");
const confirmPayment = (txRef) => __awaiter(void 0, void 0, void 0, function* () {
    const { findTransactionById } = new transactionRepoImplementation_1.TransactionRepoImpl();
    const { setUpPaymentData, findAdminByEmail } = new adminRepoImplementation_1.AdminRepoImp();
    const { findPlanById } = new adminPlanRepoImplementation_1.AdminPlanRepoImp();
    const txId = (yield (0, jwt_1.verifyToken)(txRef)).transcId;
    if (txId) {
        const transcDetails = yield findTransactionById(Number(txId));
        if (transcDetails) {
            const { id } = (yield findAdminByEmail(transcDetails.email));
            const { subType, planId } = (yield findPlanById(transcDetails.planId));
            yield setUpPaymentData(planId, (0, date_1.getNextDate)((0, date_1.getCurrentDateYYMMDD)(), subType), id);
            console.log(`Transaction ${txRef} has been confirmed.`);
        }
    }
});
exports.confirmPayment = confirmPayment;
