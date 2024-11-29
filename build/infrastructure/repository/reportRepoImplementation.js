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
exports.ReportRepoImpl = void 0;
const Report_1 = require("../../domain/entities/Report");
class ReportRepoImpl {
    create(reportData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, category } = reportData;
            return yield Report_1.Report.create({ title, description, category });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Report_1.Report.findAll();
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Report_1.Report.findByPk(id);
        });
    }
    update(reportData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, category, id } = reportData;
            const [numberOfUpdated] = yield Report_1.Report.update({ title, description, category }, { where: { id } });
            if (numberOfUpdated === 1)
                return true;
            return false;
        });
    }
    deleteReport(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const numberOfDeleted = yield Report_1.Report.destroy({ where: { id: id } });
            if (numberOfDeleted === 1)
                return true;
            return false;
        });
    }
}
exports.ReportRepoImpl = ReportRepoImpl;
