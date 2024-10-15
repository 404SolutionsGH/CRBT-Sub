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
exports.PackageCategoryRepoImp = void 0;
const Package_1 = require("../../domain/entities/Package");
const PackageCategory_1 = require("../../domain/entities/PackageCategory");
class PackageCategoryRepoImp {
    createPackageCategory(packageCategoryData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description } = packageCategoryData;
            const [itemCreated, isCreated] = yield PackageCategory_1.PackageCategory.findOrCreate({ where: { title }, defaults: { title, description } });
            if (isCreated)
                return itemCreated;
            return null;
        });
    }
    getPackageCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield PackageCategory_1.PackageCategory.findByPk(id, { include: [{ model: Package_1.Package }] });
        });
    }
    getAllPackageCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield PackageCategory_1.PackageCategory.findAll();
        });
    }
    updatePackageCategoryById(id, updatedPackageCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description } = updatedPackageCategory;
            const updatedData = yield PackageCategory_1.PackageCategory.update({ title, description }, { where: { id } });
            if (updatedData[0] === 1)
                return true;
            else
                return false;
        });
    }
    deletePackageCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const numOfDel = yield PackageCategory_1.PackageCategory.destroy({ where: { id } });
            if (numOfDel === 1)
                return true;
            return false;
        });
    }
}
exports.PackageCategoryRepoImp = PackageCategoryRepoImp;
