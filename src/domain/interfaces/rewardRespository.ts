import { Reward } from "../entities/Reward";


export interface RewardRepository{
    createOrUpdate(rewardData:Reward):Promise<void>;
    getAll(accountType:"user"|"admin"):Promise<Reward[]>;
    get(accountId:number):Promise<Reward|null>;
}
