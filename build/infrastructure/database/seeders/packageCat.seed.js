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
exports.PackageCategorySeeder = void 0;
const PackageCategory_1 = require("../../../domain/entities/PackageCategory");
const PackageCategorySeeder = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = [
        {
            id: 1,
            title: "Data Packages",
            description: "Packages offering various data bundles.",
        },
        {
            id: 2,
            title: "Voice Packages",
            description: "Packages for unlimited calling options and minutes.",
        },
        {
            id: 3,
            title: "Text Packages",
            description: "Affordable packages with bulk SMS options.",
        },
        {
            id: 4,
            title: "International Packages",
            description: "Discounted rates for international calls and data.",
        },
        {
            id: 5,
            title: "Family Packages",
            description: "Shared data, calls, and texts for family members.",
        },
        {
            id: 6,
            title: "Student Packages",
            description: "Budget-friendly plans designed for students.",
        },
        {
            id: 7,
            title: "Premium Packages",
            description: "Exclusive packages with high-speed data and unlimited calls.",
        },
        {
            id: 8,
            title: "Weekend Packages",
            description: "Special offers available only on weekends.",
        },
        {
            id: 9,
            title: "Holiday Packages",
            description: "Limited-time offers for holiday seasons.",
        },
        {
            id: 10,
            title: "Business Packages",
            description: "Plans tailored for business users with added benefits.",
        },
    ];
    yield PackageCategory_1.PackageCategory.bulkCreate(data);
});
exports.PackageCategorySeeder = PackageCategorySeeder;
