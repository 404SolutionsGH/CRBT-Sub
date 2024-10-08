import { SongRepoImpl } from "../../infrastructure/repository/songRepoImplementaion"




export const listen= async (songUrl:string)=>{
const {increaseNumberOfListeners}= new SongRepoImpl()
await increaseNumberOfListeners(1,0,songUrl)
}