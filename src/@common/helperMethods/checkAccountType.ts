import { AppError } from "../../domain/entities/AppError";
import { AdminRepoImp } from "../../infrastructure/repository/adminRepoImplementation";



export const isRequestFromSuperAdmin= async (id:string)=>{
 const { findAdminById } = new AdminRepoImp();
 const accountInfo = await findAdminById(Number(id));
 if (!accountInfo || accountInfo?.adminType !== "system") return false
 console.log("Account belongs to SuperAdmin");
 return true
}