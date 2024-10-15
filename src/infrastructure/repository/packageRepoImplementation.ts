import { where } from "sequelize";
import { Package } from "../../domain/entities/Package";
import { PackageRespository } from "../../domain/interfaces/packageRespository";

export class PackageRepoImpl implements PackageRespository {
  async createPackage(packageData: Package): Promise<Package | null> {
    const { packageName, packageDescription, packageImg, packageType, ussdCode, packageValidity } = packageData;

    const [itemCreated, isCreated] = packageImg
      ? await Package.findOrCreate({ where: { packageName, packageType, packageValidity }, defaults: { packageName, packageDescription, packageImg, packageType, ussdCode, packageValidity } })
      : await Package.findOrCreate({ where: { packageName, packageType, packageValidity }, defaults: { packageName, packageDescription, packageType, ussdCode, packageValidity } });

    if (isCreated) return itemCreated;

    return null;
  }
  async getPackageById(id: number): Promise<Package | null> {
    return await Package.findByPk(id);
  }
  async getAllPackages(): Promise<Package[]> {
    return await Package.findAll();
  }
  async updatePackageById(id: number, updatePackage: Package): Promise<boolean> {
    const { packageName, packageDescription, packageImg, packageType, ussdCode, packageValidity } = updatePackage;
    const updatedData = await Package.update({ packageName, packageDescription, packageImg, packageType, ussdCode, packageValidity }, { where: { id }, returning: true });
    if (updatedData[0] === 1) return true;
    return false;
  }
  async deletePackageById(id: number): Promise<boolean> {
    const numOfDel = await Package.destroy({ where: { id } });
    if (numOfDel === 1) return true;
    return false;
  }
}
