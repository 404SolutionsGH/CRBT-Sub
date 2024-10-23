import { Admin } from "../../domain/entities/Admin";
import { AppError } from "../../domain/entities/AppError";
import { AdminRepoImp } from "../../infrastructure/repository/adminRepoImplementation";





export const updateAdminAccountInfo=async (updatedInfo:Admin)=>{
const {updateAdminAccount}= new AdminRepoImp()
const updatedAccount= await updateAdminAccount(updatedInfo)
if(!updatedAccount) throw new AppError("Account update failed,no such account exist",404)
const {firstName,lastName,email}=updatedAccount
return { firstName, lastName, email };
}