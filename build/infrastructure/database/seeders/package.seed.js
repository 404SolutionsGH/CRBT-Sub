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
exports.PackageSeeder = void 0;
const Package_1 = require("../../../domain/entities/Package");
const PackageSeeder = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = [
        {
            id: 1,
            packageName: "Data Pack 1GB",
            packageDescription: "1GB data package valid for 1 week",
            packageImg: null,
            packageType: "data",
            ussdCode: "*123*1#",
            packageValidity: "1W",
            packageCatId: 1,
            price: "5.00",
        },
        {
            id: 2,
            packageName: "Voice Pack 100 Minutes",
            packageDescription: "100 minutes voice package valid for 1 month",
            packageImg: null,
            packageType: "voice",
            ussdCode: "*123*2#",
            packageValidity: "1D",
            packageCatId: 2,
            price: "5.00",
        },
        {
            id: 3,
            packageName: "Text Pack 500 SMS",
            packageDescription: "500 SMS package valid for 2 weeks",
            packageImg: null,
            packageType: "text",
            ussdCode: "*123*3#",
            packageValidity: "0I",
            packageCatId: 3,
            price: "9.99",
        },
        {
            id: 4,
            packageName: "International Pack 50 Minutes",
            packageDescription: "50 minutes for international calls, valid for 1 month",
            packageImg: null,
            packageType: "international",
            ussdCode: "*123*4#",
            packageValidity: "2D",
            packageCatId: 4,
            price: "7.00",
        },
        {
            id: 5,
            packageName: "Family Pack 5GB Shared",
            packageDescription: "5GB shared data for family, valid for 1 month",
            packageImg: null,
            packageType: "family",
            ussdCode: "*123*5#",
            packageValidity: "1M",
            packageCatId: 5,
            price: "5.00",
        },
        {
            id: 6,
            packageName: "Student Pack 500MB",
            packageDescription: "500MB data for students, valid for 2 weeks",
            packageImg: null,
            packageType: "data",
            ussdCode: "*123*6#",
            packageValidity: "2W",
            packageCatId: 6,
            price: "1.00",
        },
        {
            id: 7,
            packageName: "Premium Pack Unlimited",
            packageDescription: "Unlimited voice and data, valid for 1 month",
            packageImg: null,
            packageType: "premium",
            ussdCode: "*123*7#",
            packageValidity: "1D",
            packageCatId: 7,
            price: "6.00",
        },
        {
            id: 8,
            packageName: "Weekend Pack 2GB",
            packageDescription: "2GB data for weekends only, valid for 1 week",
            packageImg: null,
            packageType: "weekend",
            ussdCode: "*123*8#",
            packageValidity: "1W",
            packageCatId: 8,
            price: "5.00",
        },
        {
            id: 9,
            packageName: "Holiday Pack 1GB",
            packageDescription: "1GB data for holiday season, valid for 1 week",
            packageImg: null,
            packageType: "holiday",
            ussdCode: "*123*9#",
            packageValidity: "0I",
            packageCatId: 9,
            price: "2.00",
        },
        {
            id: 10,
            packageName: "Business Pack 10GB",
            packageDescription: "10GB data for business use, valid for 1 month",
            packageImg: null,
            packageType: "business",
            ussdCode: "*123*10#",
            packageValidity: "5W",
            packageCatId: 10,
            price: "9.00",
        },
    ];
    yield Package_1.Package.bulkCreate(data);
});
exports.PackageSeeder = PackageSeeder;
