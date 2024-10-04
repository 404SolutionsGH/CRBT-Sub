import { SubSongs } from "../entities/SubSongs";



export interface subSongsRepository {
  createSubscription(subDetails: SubSongs): Promise<SubSongs>;
  findSubscriptionsByOwnerId(ownerId: number): Promise<SubSongs | null>;
  findSubscriptionById(id: number): Promise<SubSongs | null>;
}