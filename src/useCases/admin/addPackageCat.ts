import { AppError } from "../../domain/entities/AppError";
import { PackageCategory } from "../../domain/entities/PackageCategory";
import { PackageCategoryRepoImp } from "../../infrastructure/repository/packageCatRepoImplementaion";


export const addPackageCat = async (packageData: PackageCategory) => {
  const { createPackageCategory } = new PackageCategoryRepoImp();
  if (!(await createPackageCategory(packageData))) throw new AppError(`The package category with name ${packageData.title} already exist`, 409);
};
