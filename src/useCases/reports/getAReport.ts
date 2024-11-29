import { ReportRepoImpl } from "../../infrastructure/repository/reportRepoImplementation";



export const getReport=async (reportId:number)=>{
    const {getOne} = new ReportRepoImpl();
    return await getOne(reportId)
}