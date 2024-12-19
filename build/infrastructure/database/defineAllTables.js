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
const Package_1 = require("../../domain/entities/Package");
const PackageCategory_1 = require("../../domain/entities/PackageCategory");
const SubAdminplans_1 = require("../../domain/entities/SubAdminplans");
const SubSongs_1 = require("../../domain/entities/SubSongs");
const User_1 = require("../../domain/entities/User");
const adminPlanTable_1 = require("./tables/adminPlanTable");
const adminTable_1 = require("./tables/adminTable");
const adsTable_1 = require("./tables/adsTable");
const packageCatTable_1 = require("./tables/packageCatTable");
const packageTables_1 = require("./tables/packageTables");
const ReportTable_1 = require("./tables/ReportTable");
const rewardTable_1 = require("./tables/rewardTable");
const roleTable_1 = require("./tables/roleTable");
const serviceTable_1 = require("./tables/serviceTable");
const songTable_1 = require("./tables/songTable");
const subAdminPlansTable_1 = require("./tables/subAdminPlansTable");
const subSongsTable_1 = require("./tables/subSongsTable");
const systemTable_1 = require("./tables/systemTable");
const tempSongTable_1 = require("./tables/tempSongTable");
const transactionTable_1 = require("./tables/transactionTable");
const userContactsTable_1 = require("./tables/userContactsTable");
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
    (0, packageCatTable_1.definePackageCategoryTable)();
    (0, packageTables_1.definePackageTable)();
    (0, transactionTable_1.defineTransactionTable)();
    (0, systemTable_1.defineSystemTable)();
    (0, adsTable_1.defineAdsTable)();
    (0, rewardTable_1.defineRewardTable)();
    (0, roleTable_1.defineRoleTable)();
    (0, ReportTable_1.defineReportTable)();
    (0, userContactsTable_1.defineUserContactsTable)();
    console.log("Setting Up Associations btw Tables...");
    settingUpTableAssociations();
    console.log("Set up done");
});
exports.defineAllTables = defineAllTables;
const settingUpTableAssociations = () => {
    // setting up link btw Users and SubSongs
    User_1.User.hasMany(SubSongs_1.SubSongs, { foreignKey: "subscriberId" });
    SubSongs_1.SubSongs.belongsTo(User_1.User, { foreignKey: "subscriberId" });
    // setting up link btw Admins and SubAdminPlans
    Admin_1.Admin.hasMany(SubAdminplans_1.SubAdminPlans, { foreignKey: "subscriberId" });
    SubAdminplans_1.SubAdminPlans.belongsTo(Admin_1.Admin, { foreignKey: "subscriberId" });
    // setting up link btw Packages and PackageCatgories
    PackageCategory_1.PackageCategory.hasMany(Package_1.Package, { foreignKey: "packageCatId" });
    Package_1.Package.belongsTo(PackageCategory_1.PackageCategory, { foreignKey: "packageCatId" });
};
