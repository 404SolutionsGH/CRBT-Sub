import { Package } from "../entities/Package";

export interface PackageRespository {
  createPackage(packageData: Package): Promise<Package | null>;
  getPackageById(id: number): Promise<Package | null>;
  getAllPackages(): Promise<Package[]>;
  updatePackageById(id: number,updatePackage:Package): Promise<boolean>;
  deletePackageById(id: number): Promise<boolean>;
  deletPackagesByCatId(id:number):Promise<boolean>
}
