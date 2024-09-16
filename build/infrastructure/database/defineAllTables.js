"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineAllTables = void 0;
const userTable_1 = require("./tables/userTable");
// method for defining all table structures using the models
const defineAllTables = () => {
    (0, userTable_1.defineUserTable)();
};
exports.defineAllTables = defineAllTables;
