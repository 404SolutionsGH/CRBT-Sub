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
exports.AdminSeeder = void 0;
const Admin_1 = require("../../../domain/entities/Admin");
const bcrypt_1 = require("../../../libs/bcrypt");
const AdminSeeder = () => __awaiter(void 0, void 0, void 0, function* () {
    const password = yield (0, bcrypt_1.encryptPassword)("Admin1234");
    yield Admin_1.Admin.create({
        email: "admin@gmail.com",
        firstName: "adminFirstName",
        lastName: "adminLastName",
        password: password,
        adminType: "system",
    });
});
exports.AdminSeeder = AdminSeeder;
