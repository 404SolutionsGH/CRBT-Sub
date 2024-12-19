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
exports.getUserContacts = void 0;
const UserContacts_1 = require("../../domain/entities/UserContacts");
const getUserContacts = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = 1, size = 10) {
    const limit = size; // Number of records per page
    const offset = (page - 1) * size; // Starting point for the current page
    const { count, rows } = yield UserContacts_1.UserContacts.findAndCountAll({
        limit,
        offset,
        attributes: { exclude: ["id", "ownerId", "updatedAt"] },
    });
    return {
        totalItems: count,
        result: rows,
        totalPages: Math.ceil(count / size),
        currentPage: page,
    };
});
exports.getUserContacts = getUserContacts;
