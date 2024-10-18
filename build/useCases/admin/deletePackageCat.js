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
exports.deletePackageCategory = void 0;
const AppError_1 = require("../../domain/entities/AppError");
const packageCatRepoImplementaion_1 = require("../../infrastructure/repository/packageCatRepoImplementaion");
const packageRepoImplementation_1 = require("../../infrastructure/repository/packageRepoImplementation");
const deletePackageCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { deletePackageCategoryById } = new packageCatRepoImplementaion_1.PackageCategoryRepoImp();
    const { deletPackagesByCatId } = new packageRepoImplementation_1.PackageRepoImpl();
    if (!(yield deletePackageCategoryById(id)))
        throw new AppError_1.AppError("Package Category Deletion failed,no package with such id exist.", 404);
    //   deleting all packages related to the category which was just deleted
    yield deletPackagesByCatId(id);
});
exports.deletePackageCategory = deletePackageCategory;
