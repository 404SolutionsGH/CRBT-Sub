import { AppError } from "../../domain/entities/AppError";
import { Package } from "../../domain/entities/Package";
import { PackageCategoryRepoImp } from "../../infrastructure/repository/packageCatRepoImplementaion";
import { PackageRepoImpl } from "../../infrastructure/repository/packageRepoImplementation";

export const addPackage = async (packageData: Package) => {
  const { getPackageCategoryById } = new PackageCategoryRepoImp();
  const { createPackage } = new PackageRepoImpl();
  if (!(await getPackageCategoryById(packageData.packageCatId))) throw new AppError(`No package category with packageCatId ${packageData.packageCatId} exist in the system`, 404);
  if (!(await createPackage(packageData))) throw new AppError(`The package with name ${packageData.packageName} already exist`, 409);
};
