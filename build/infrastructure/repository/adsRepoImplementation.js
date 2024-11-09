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
exports.AdsRepoImpl = void 0;
const Ads_1 = require("../../domain/entities/Ads");
class AdsRepoImpl {
    create(adsData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { image, url, title, description, expiryDate } = adsData;
            return yield Ads_1.Ads.create({ image, url, title, description, expiryDate });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Ads_1.Ads.findAll();
        });
    }
    update(adsData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { image, url, id, title, description, expiryDate } = adsData;
            const [numberOfUpdated] = yield Ads_1.Ads.update({ image, url, title, description, expiryDate }, { where: { id } });
            if (numberOfUpdated === 1)
                return true;
            return false;
        });
    }
    deleteAd(adsId) {
        return __awaiter(this, void 0, void 0, function* () {
            const numberOfDeleted = yield Ads_1.Ads.destroy({ where: { id: adsId } });
            if (numberOfDeleted === 1)
                return true;
            return false;
        });
    }
}
exports.AdsRepoImpl = AdsRepoImpl;
