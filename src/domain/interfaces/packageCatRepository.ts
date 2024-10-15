import { PackageCategory } from "../entities/PackageCategory";



export interface PackageCategoryRespository {
  createPackageCategory(packageCategoryData: PackageCategory): Promise<PackageCategory | null>;
  getPackageCategoryById(id: number): Promise<PackageCategory | null>;
  getAllPackageCategories(): Promise<PackageCategory[]>;
  updatePackageCategoryById(id: number, updatedPackageCategory: PackageCategory): Promise<boolean>;
  deletePackageCategoryById(id: number): Promise<boolean>;
}
