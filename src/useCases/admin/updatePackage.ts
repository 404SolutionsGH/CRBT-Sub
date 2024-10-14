import { AppError } from "../../domain/entities/AppError";
import { Package } from "../../domain/entities/Package";
import { PackageRepoImpl } from "../../infrastructure/repository/packageRepoImplementation";

export const updatePackage = async (updatedPackageData: Package) => {
  const { updatePackageById } = new PackageRepoImpl();
  if (!(await updatePackageById(updatedPackageData.id, updatedPackageData))) throw new AppError("Package update failed, no package with such id exist", 404);
};
