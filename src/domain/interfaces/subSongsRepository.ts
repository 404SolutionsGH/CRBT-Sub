import { SubSongs } from "../entities/SubSongs";



export interface SubSongsRepository {
  createSubscription(subDetails: SubSongs): Promise<SubSongs>;
  findSubscriptionsBySubscriberId(subscriberId: number, isSubValid: boolean | null, update: boolean): Promise<SubSongs | null>;
  findSubscriptionById(id: number): Promise<SubSongs | null>;
}