import { AppError } from "../../domain/entities/AppError";
import { PackageRepoImpl } from "../../infrastructure/repository/packageRepoImplementation";

export const deletePackage = async (id: number) => {
  const { deletePackageById } = new PackageRepoImpl();
  if (!(await deletePackageById(id))) throw new AppError("Package Deletion failed,no package with such id exist.", 404);
};
