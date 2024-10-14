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
exports.defineAllTables = void 0;
const Admin_1 = require("../../domain/entities/Admin");
const SubAdminplans_1 = require("../../domain/entities/SubAdminplans");
const SubSongs_1 = require("../../domain/entities/SubSongs");
const User_1 = require("../../domain/entities/User");
const adminPlanTable_1 = require("./tables/adminPlanTable");
const adminTable_1 = require("./tables/adminTable");
const packageTables_1 = require("./tables/packageTables");
const serviceTable_1 = require("./tables/serviceTable");
const songTable_1 = require("./tables/songTable");
const subAdminPlansTable_1 = require("./tables/subAdminPlansTable");
const subSongsTable_1 = require("./tables/subSongsTable");
const tempSongTable_1 = require("./tables/tempSongTable");
const userTable_1 = require("./tables/userTable");
// method for defining all table structures using the models
const defineAllTables = () => __awaiter(void 0, void 0, void 0, function* () {
    (0, userTable_1.defineUserTable)();
    (0, adminPlanTable_1.defineAdminPlanTable)();
    (0, adminTable_1.defineAdminTable)();
    (0, serviceTable_1.defineServiceTable)();
    (0, songTable_1.defineSongTable)();
    (0, tempSongTable_1.defineTempSongTable)();
    (0, subSongsTable_1.defineSubSongsTable)();
    (0, subAdminPlansTable_1.defineSubAdminPlansTable)();
    (0, packageTables_1.definePackageTable)();
    console.log("Setting Up Associations btw Tables...");
    settingUpTableAssociations();
    console.log("Set up done");
});
exports.defineAllTables = defineAllTables;
const settingUpTableAssociations = () => {
    // setting up link btw User and SubSongs
    User_1.User.hasMany(SubSongs_1.SubSongs, { foreignKey: "subscriberId" });
    SubSongs_1.SubSongs.belongsTo(User_1.User, { foreignKey: "subscriberId" });
    // setting up link btw Admin and SubAdminPlans
    Admin_1.Admin.hasMany(SubAdminplans_1.SubAdminPlans, { foreignKey: "subscriberId" });
    SubAdminplans_1.SubAdminPlans.belongsTo(Admin_1.Admin, { foreignKey: "subscriberId" });
};
