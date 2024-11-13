import { SystemRepoImpl } from "../../infrastructure/repository/systemRepoImplementation"




export const getSystemInfo=async ()=>{
const {getSysInfo}= new SystemRepoImpl()
    return await getSysInfo()
}