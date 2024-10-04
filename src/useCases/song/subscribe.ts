import { SubSongs } from "../../domain/entities/SubSongs"
import { SongRepoImpl } from "../../infrastructure/repository/songRepoImplementaion"
import { SubSongsRepoImp } from "../../infrastructure/repository/subSongsRepoImplementation"
import { UserRepoImp } from "../../infrastructure/repository/userRepoImplemtation"






export const subscribeToSong= async (subscriberId:number,songId:number)=>{
const{createSubscription}=new SubSongsRepoImp()
const {updateSubSongId}=new UserRepoImp()
const {findSongById,increaseNumberOfSubscribers}=new SongRepoImpl()
await increaseNumberOfSubscribers(1,songId)
const {ownerId,price,} = (await findSongById(songId))!
await updateSubSongId(songId,subscriberId)
await createSubscription(SubSongs.build({ subscriberId, price, songOwnerId:ownerId }));
}