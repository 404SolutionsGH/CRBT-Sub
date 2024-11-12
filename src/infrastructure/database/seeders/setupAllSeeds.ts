import { AdminPlanSeeder } from "./admin.plan.seed";
import { AdminSeeder } from "./admin.seed";
import { AdsSeeder } from "./ads.seed";
import { PackageSeeder } from "./package.seed";
import { PackageCategorySeeder } from "./packageCat.seed";
import { SongSeeder } from "./songs.seed";
import { SystemSeeder } from "./system.seed";

export const setUpAllSeeders = async () => {
  await AdminPlanSeeder();
  await AdminSeeder();
  await SystemSeeder();
  await AdsSeeder();
  await PackageCategorySeeder();
  await PackageSeeder();
  await SongSeeder();
};
