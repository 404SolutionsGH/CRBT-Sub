import { AppError } from "../../domain/entities/AppError";
import { PackageCategory } from "../../domain/entities/PackageCategory";
import { PackageCategoryRepoImp } from "../../infrastructure/repository/packageCatRepoImplementaion";


export const updatePackageCategory = async (updatedPackageData: PackageCategory) => {
  const { updatePackageCategoryById } = new PackageCategoryRepoImp();
  if (!(await updatePackageCategoryById(updatedPackageData.id, updatedPackageData))) throw new AppError("PackageCategory update failed, no package with such id exist", 404);
};
