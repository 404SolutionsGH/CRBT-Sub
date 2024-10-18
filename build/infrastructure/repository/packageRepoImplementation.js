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
exports.PackageRepoImpl = void 0;
const Package_1 = require("../../domain/entities/Package");
class PackageRepoImpl {
    createPackage(packageData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { packageName, packageDescription, packageImg, packageType, ussdCode, packageValidity, packageCatId } = packageData;
            const [itemCreated, isCreated] = packageImg
                ? yield Package_1.Package.findOrCreate({
                    where: { packageName, packageType, packageValidity, packageCatId },
                    defaults: { packageName, packageDescription, packageImg, packageType, ussdCode, packageValidity, packageCatId },
                })
                : yield Package_1.Package.findOrCreate({
                    where: { packageName, packageType, packageValidity, packageCatId },
                    defaults: { packageName, packageDescription, packageType, ussdCode, packageValidity, packageCatId },
                });
            if (isCreated)
                return itemCreated;
            return null;
        });
    }
    getPackageById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Package_1.Package.findByPk(id);
        });
    }
    getAllPackages() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Package_1.Package.findAll();
        });
    }
    updatePackageById(id, updatePackage) {
        return __awaiter(this, void 0, void 0, function* () {
            const { packageName, packageDescription, packageImg, packageType, ussdCode, packageValidity, packageCatId } = updatePackage;
            const updatedData = yield Package_1.Package.update({ packageName, packageDescription, packageImg, packageType, ussdCode, packageValidity, packageCatId }, { where: { id }, returning: true });
            if (updatedData[0] === 1)
                return true;
            return false;
        });
    }
    deletePackageById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const numOfDel = yield Package_1.Package.destroy({ where: { id } });
            if (numOfDel === 1)
                return true;
            return false;
        });
    }
    deletPackagesByCatId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const numOfDel = yield Package_1.Package.destroy({ where: { packageCatId: id } });
            if (numOfDel === 1)
                return true;
            return false;
        });
    }
}
exports.PackageRepoImpl = PackageRepoImpl;
