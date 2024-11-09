import { AdsRepoImpl } from "../../infrastructure/repository/adsRepoImplementation";




export const getAllAds= async ()=>{
    const { getAll } = new AdsRepoImpl();
    return await getAll()
}