import { AdminSeeder } from "./admin.seed"
import { SystemSeeder } from "./system.seed"



export const setUpAllSeeders= async()=>{
await AdminSeeder()
await SystemSeeder()


}