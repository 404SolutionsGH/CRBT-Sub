import { AppError } from "../../domain/entities/AppError";
import { Package } from "../../domain/entities/Package";
import { PackageRepoImpl } from "../../infrastructure/repository/packageRepoImplementation";

export const addPackage = async (packageData: Package) => {
  const { createPackage } = new PackageRepoImpl();
  if (!(await createPackage(packageData))) throw new AppError(`The package with name ${packageData.packageName} already exist`, 409);
};
