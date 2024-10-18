import { AppError } from "../../domain/entities/AppError";
import { PackageCategoryRepoImp } from "../../infrastructure/repository/packageCatRepoImplementaion";
import { PackageRepoImpl } from "../../infrastructure/repository/packageRepoImplementation";

export const deletePackageCategory = async (id: number) => {
  const { deletePackageCategoryById } = new PackageCategoryRepoImp();
  const { deletPackagesByCatId } = new PackageRepoImpl();
  if (!(await deletePackageCategoryById(id))) throw new AppError("Package Category Deletion failed,no package with such id exist.", 404);
  //   deleting all packages related to the category which was just deleted
  await deletPackagesByCatId(id);
};
