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
exports.SystemSeeder = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Admin_1 = require("../../../domain/entities/Admin");
const System_1 = require("../../../domain/entities/System");
const SystemSeeder = () => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = (yield Admin_1.Admin.findOne({ where: { adminType: "system" } }));
    yield System_1.System.create({ adminId: id, chapaSecretKey: process.env.ChapaSecretKey });
});
exports.SystemSeeder = SystemSeeder;
