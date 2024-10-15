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
exports.getPackage = exports.allPackages = void 0;
const AppError_1 = require("../../domain/entities/AppError");
const packageRepoImplementation_1 = require("../../infrastructure/repository/packageRepoImplementation");
const { getAllPackages, getPackageById } = new packageRepoImplementation_1.PackageRepoImpl();
const allPackages = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield getAllPackages();
});
exports.allPackages = allPackages;
const getPackage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const packageData = yield getPackageById(id);
    if (packageData)
        return packageData;
    throw new AppError_1.AppError("No package with the id provided exist", 404);
});
exports.getPackage = getPackage;
