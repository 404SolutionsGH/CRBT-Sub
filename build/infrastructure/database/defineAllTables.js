"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineAllTables = void 0;
const adminPlanTable_1 = require("./tables/adminPlanTable");
const adminTable_1 = require("./tables/adminTable");
const serviceTable_1 = require("./tables/serviceTable");
const songTable_1 = require("./tables/songTable");
const subAdminPlansTable_1 = require("./tables/subAdminPlansTable");
const subSongsTable_1 = require("./tables/subSongsTable");
const tempSongTable_1 = require("./tables/tempSongTable");
const userTable_1 = require("./tables/userTable");
// method for defining all table structures using the models
const defineAllTables = () => {
    (0, userTable_1.defineUserTable)();
    (0, adminPlanTable_1.defineAdminPlanTable)();
    (0, adminTable_1.defineAdminTable)();
    (0, serviceTable_1.defineServiceTable)();
    (0, songTable_1.defineSongTable)();
    (0, tempSongTable_1.defineTempSongTable)();
    (0, subSongsTable_1.defineSubSongsTable)();
    (0, subAdminPlansTable_1.defineSubAdminPlansTable)();
};
exports.defineAllTables = defineAllTables;
