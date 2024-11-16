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
exports.setUpAllSeeders = void 0;
const admin_plan_seed_1 = require("./admin.plan.seed");
const admin_seed_1 = require("./admin.seed");
const ads_seed_1 = require("./ads.seed");
const package_seed_1 = require("./package.seed");
const packageCat_seed_1 = require("./packageCat.seed");
const role_seed_1 = require("./role.seed");
const songs_seed_1 = require("./songs.seed");
const system_seed_1 = require("./system.seed");
const setUpAllSeeders = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, admin_plan_seed_1.AdminPlanSeeder)();
    yield (0, admin_seed_1.AdminSeeder)();
    yield (0, system_seed_1.SystemSeeder)();
    yield (0, ads_seed_1.AdsSeeder)();
    yield (0, packageCat_seed_1.PackageCategorySeeder)();
    yield (0, package_seed_1.PackageSeeder)();
    yield (0, songs_seed_1.SongSeeder)();
    yield (0, role_seed_1.RoleSeeder)();
});
exports.setUpAllSeeders = setUpAllSeeders;
