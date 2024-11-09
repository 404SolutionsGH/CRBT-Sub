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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdsController = exports.getAllAdsController = exports.updateAdsController = exports.createAdsController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const addAds_1 = require("../../useCases/admin/addAds");
const Ads_1 = require("../../domain/entities/Ads");
const isStringNumber_1 = require("../../@common/helperMethods/isStringNumber");
const getAllAds_1 = require("../../useCases/ads/getAllAds");
const deleteAds_1 = require("../../useCases/admin/deleteAds");
const updateAds_1 = require("../../useCases/admin/updateAds");
exports.createAdsController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, url, image, expiryDate } = req.body;
    yield (0, addAds_1.addAds)(Ads_1.Ads.build({ title, description, url, image, expiryDate }));
    res.status(201).json({ message: `Ad with title ${title} has been created sucessfully` });
}));
exports.updateAdsController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, url, image, expiryDate } = req.body;
    const { id } = req.params;
    (0, isStringNumber_1.isStringContentNumber)(id, "id");
    yield (0, updateAds_1.updateAds)(Ads_1.Ads.build({ title, description, url, image, id: Number(id), expiryDate }));
    res.status(200).json({ message: `Ad updated sucessfully` });
}));
exports.getAllAdsController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json(yield (0, getAllAds_1.getAllAds)());
}));
exports.deleteAdsController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    (0, isStringNumber_1.isStringContentNumber)(id, "id");
    yield (0, deleteAds_1.deleteAds)(Number(id));
    res.status(204).end();
}));
