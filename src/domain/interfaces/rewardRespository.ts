import { Reward } from "../entities/Reward";


export interface RewardRepository{
    createOrUpdate(rewardData:Reward):Promise<void>;
    getAll():Promise<Reward[]>;
    get(accountId:number):Promise<Reward|null>;
}
