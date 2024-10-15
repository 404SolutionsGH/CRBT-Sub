import { Package } from "../../domain/entities/Package";
import { PackageCategory } from "../../domain/entities/PackageCategory";
import { PackageCategoryRespository } from "../../domain/interfaces/packageCatRepository";

export class PackageCategoryRepoImp implements PackageCategoryRespository {
  async createPackageCategory(packageCategoryData: PackageCategory): Promise<PackageCategory | null> {
    const { title, description } = packageCategoryData;
    const [itemCreated, isCreated] = await PackageCategory.findOrCreate({ where: { title }, defaults: { title, description } });

    if (isCreated) return itemCreated;

    return null;
  }
  async getPackageCategoryById(id: number): Promise<PackageCategory | null> {
    return await PackageCategory.findByPk(id, { include: [{ model: Package }] });
  }
  async getAllPackageCategories(): Promise<PackageCategory[]> {
    return await PackageCategory.findAll();
  }
  async updatePackageCategoryById(id: number, updatedPackageCategory: PackageCategory): Promise<boolean> {
    const { title, description } = updatedPackageCategory;
    const updatedData = await PackageCategory.update({ title, description }, { where: { id } });
    if (updatedData[0] === 1) return true;
    else return false;
  }
  async deletePackageCategoryById(id: number): Promise<boolean> {
    const numOfDel = await PackageCategory.destroy({ where: { id } });
    if (numOfDel === 1) return true;
    return false;
  }
}
