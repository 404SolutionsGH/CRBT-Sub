import { AppError } from "../../domain/entities/AppError";
import { PackageCategoryRepoImp } from "../../infrastructure/repository/packageCatRepoImplementaion"



const { getAllPackageCategories,getPackageCategoryById } = new PackageCategoryRepoImp();

export const allPackageCategories= async ()=>{
return await getAllPackageCategories()
}

export const getPackageCategory=async (id:number)=>{
const packageCat = await getPackageCategoryById(id); 
if(!packageCat) throw new AppError("No package  category with the id provided exist", 404);  
return packageCat;
}