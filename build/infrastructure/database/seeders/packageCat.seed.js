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
            title: "5G",
            description: "5G Services",
        },
        {
            title: "Voice ",
            description: "Voice",
        },
        {
            title: "Text Packages",
            description: "Affordable packages with bulk SMS options.",
        },
        {
            title: "International Packages",
            description: "Discounted rates for international calls and data.",
        },
        {
            title: "Family Packages",
            description: "Shared data, calls, and texts for family members.",
        },
    ];
    yield PackageCategory_1.PackageCategory.bulkCreate(data);
});
exports.PackageCategorySeeder = PackageCategorySeeder;
