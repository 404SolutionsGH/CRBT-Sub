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
exports.deleteRoleController = exports.getAllRolesController = exports.getRoleController = exports.updateRoleController = exports.createRoleController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const role_1 = require("../../useCases/admin/role");
const Role_1 = require("../../domain/entities/Role");
const roleUsesCaes = new role_1.RoleUseCases();
exports.createRoleController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, allowedPages } = req.body;
    yield roleUsesCaes.createRole(Role_1.Role.build({ name, allowedPages }));
    res.status(201).json({ message: `The Role: ${name} has been created sucessfully` });
}));
exports.updateRoleController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, allowedPages } = req.body;
    yield roleUsesCaes.updateRole(Role_1.Role.build({ name, allowedPages }));
    res.status(200).json({ message: `The Role: ${name} has been updated sucessfully` });
}));
exports.getRoleController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    res.status(200).json({ role: yield roleUsesCaes.getRole(name) });
}));
exports.getAllRolesController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json(yield roleUsesCaes.getAllRoles());
}));
exports.deleteRoleController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    yield roleUsesCaes.deleteRole(name);
    res.status(204).end();
}));
