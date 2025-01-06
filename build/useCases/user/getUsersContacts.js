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
    const contacts = yield UserContacts_1.UserContacts.findAll({
        attributes: { exclude: ["id", "ownerId", "updatedAt"] },
    });
    const results = [];
    contacts.forEach((contact) => {
        contact.contacts.forEach((phone) => {
            results.push(phone);
        });
    });
    return {
        totalItems: results.length,
        results
    };
});
exports.getUserContacts = getUserContacts;
