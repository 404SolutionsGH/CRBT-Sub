"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineAllTables = void 0;
const adminTable_1 = require("./tables/adminTable");
const userTable_1 = require("./tables/userTable");
// method for defining all table structures using the models
const defineAllTables = () => {
    (0, userTable_1.defineUserTable)();
    (0, adminTable_1.defineAdminTable)();
};
exports.defineAllTables = defineAllTables;
