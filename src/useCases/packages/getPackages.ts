import { AppError } from "../../domain/entities/AppError";
import { PackageRepoImpl } from "../../infrastructure/repository/packageRepoImplementation";

const { getAllPackages, getPackageById } = new PackageRepoImpl();
export const allPackages = async () => {
  return await getAllPackages();
};

export const getPackage = async (id: number) => {
  const packageData = await getPackageById(id);
  if (packageData) return packageData;
  throw new AppError("No package with the id provided exist", 404);
};
