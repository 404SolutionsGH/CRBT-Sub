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
exports.addPackageCat = void 0;
const AppError_1 = require("../../domain/entities/AppError");
const packageCatRepoImplementaion_1 = require("../../infrastructure/repository/packageCatRepoImplementaion");
const addPackageCat = (packageData) => __awaiter(void 0, void 0, void 0, function* () {
    const { createPackageCategory } = new packageCatRepoImplementaion_1.PackageCategoryRepoImp();
    if (!(yield createPackageCategory(packageData)))
        throw new AppError_1.AppError(`The package category with name ${packageData.title} already exist`, 409);
});
exports.addPackageCat = addPackageCat;
