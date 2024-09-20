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
exports.ServiceRepoImp = void 0;
const Service_1 = require("../../domain/entities/Service");
class ServiceRepoImp {
    createService(serviceData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ownerId, serviceName, planeType, category } = serviceData;
            const [itemCreated, isCreated] = yield Service_1.Service.findOrCreate({
                where: { ownerId },
                defaults: {
                    ownerId,
                    serviceName,
                    planeType,
                    category,
                },
            });
            if (isCreated)
                return itemCreated;
            return null;
        });
    }
    findServiceById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Service_1.Service.findByPk(id);
        });
    }
    findServiceByName(serviceName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Service_1.Service.findOne({ where: { serviceName } });
        });
    }
    findServiceWithIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Service_1.Service.findAll({ where: { ownerId: ids } });
        });
    }
}
exports.ServiceRepoImp = ServiceRepoImp;
