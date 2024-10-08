import { SubSongsRepoImp } from "../../infrastructure/repository/subSongsRepoImplementation"






export const unsubscribe= async (subscriberId:number)=>{
const {findSubscriptionsBySubscriberId}= new SubSongsRepoImp()
await findSubscriptionsBySubscriberId(subscriberId,true,true)
}