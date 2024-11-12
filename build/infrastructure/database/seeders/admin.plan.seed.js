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
exports.AdminPlanSeeder = void 0;
const AdminPlan_1 = require("../../../domain/entities/AdminPlan");
const AdminPlanSeeder = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = [
        {
            planId: 1,
            planType: "Basic",
            price: "850",
            subType: "yearly",
            planName: "CRBT-Plans",
            benefits: {
                songLimit: 200,
                subscriberLimit: 500,
                numberOfSongsPerUpload: 10,
            },
            deleteFlag: false,
        },
        {
            planId: 2,
            planType: "Standard",
            price: "999",
            subType: "monthly",
            planName: "CRBT-Plans",
            benefits: {
                songLimit: 450,
                subscriberLimit: 900,
                numberOfSongsPerUpload: 40,
            },
            deleteFlag: false,
        },
        {
            planId: 3,
            planType: "Pro",
            price: "1999",
            subType: "yearly",
            planName: "CRBT-Plans",
            benefits: {
                songLimit: 1000,
                subscriberLimit: 1500,
                numberOfSongsPerUpload: 90,
            },
            deleteFlag: false,
        },
    ];
    yield AdminPlan_1.AdminPlan.bulkCreate(data);
});
exports.AdminPlanSeeder = AdminPlanSeeder;
