import { Admin } from "../../domain/entities/Admin";
import { Package } from "../../domain/entities/Package";
import { PackageCategory } from "../../domain/entities/PackageCategory";
import { SubAdminPlans } from "../../domain/entities/SubAdminplans";
import { SubSongs } from "../../domain/entities/SubSongs";
import { User } from "../../domain/entities/User";
import { defineAdminPlanTable } from "./tables/adminPlanTable";
import { defineAdminTable } from "./tables/adminTable";
import { definePackageCategoryTable } from "./tables/packageCatTable";
import { definePackageTable } from "./tables/packageTables";
import { defineServiceTable } from "./tables/serviceTable";
import { defineSongTable } from "./tables/songTable";
import { defineSubAdminPlansTable } from "./tables/subAdminPlansTable";
import { defineSubSongsTable } from "./tables/subSongsTable";
import { defineTempSongTable } from "./tables/tempSongTable";
import { defineUserTable } from "./tables/userTable";

// method for defining all table structures using the models
export const defineAllTables = async () => {
  defineUserTable();
  defineAdminPlanTable();
  defineAdminTable();
  defineServiceTable();
  defineSongTable();
  defineTempSongTable();
  defineSubSongsTable();
  defineSubAdminPlansTable();
  definePackageTable();
  definePackageCategoryTable();
  console.log("Setting Up Associations btw Tables...");
  settingUpTableAssociations();
  console.log("Set up done");
};

const settingUpTableAssociations = () => {
  // setting up link btw Users and SubSongs
  User.hasMany(SubSongs, { foreignKey: "subscriberId" });
  SubSongs.belongsTo(User, { foreignKey: "subscriberId" });

  // setting up link btw Admins and SubAdminPlans
  Admin.hasMany(SubAdminPlans, { foreignKey: "subscriberId" });
  SubAdminPlans.belongsTo(Admin, { foreignKey: "subscriberId" });

  // setting up link btw Packages and PackageCatgories
  PackageCategory.hasMany(Package, { foreignKey: "packageCatId" });
  Package.belongsTo(PackageCategory, { foreignKey: "packageCatId" });
};
