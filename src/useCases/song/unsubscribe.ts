import { SongRepoImpl } from "../../infrastructure/repository/songRepoImplementaion"
import { SubSongsRepoImp } from "../../infrastructure/repository/subSongsRepoImplementation"
import { UserRepoImp } from "../../infrastructure/repository/userRepoImplemtation"

export const unsubscribe= async (subscriberId:number)=>{
const {findSubscriptionsBySubscriberId}= new SubSongsRepoImp()
const { updateSubSongId,findUserById } = new UserRepoImp()
const {increaseNumberOfSubscribers}=new SongRepoImpl()
const {subSongId}= (await findUserById(subscriberId))!
await increaseNumberOfSubscribers(1,subSongId,'dec')
await updateSubSongId(0,subscriberId)
await findSubscriptionsBySubscriberId(subscriberId,true,true)
}