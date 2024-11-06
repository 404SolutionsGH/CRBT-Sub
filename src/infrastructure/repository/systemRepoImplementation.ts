import { System } from "../../domain/entities/System";
import { SystemRepository } from "../../domain/interfaces/systemRepository";

export class SystemRepoImpl implements SystemRepository {
  async getSystemStatus(adminId: number|undefined): Promise<"Active" | "Maintaince"> {
     if (!adminId) {
       return (await System.findAll())[0].status;
     }
    return (await System.findOne({ where: { adminId } }))!.status;
  }
  async setSystemStatus(status: "Active" | "Maintaince", adminId: number): Promise<void> {
    await System.update({ status }, { where: { adminId } });
  }
  async setChapaSecretKey(key: string, adminId: number): Promise<void> {
     await System.update({ chapaSecretKey:key }, { where: { adminId } });
  }
  async getChapaSecretkey(adminId: number|undefined): Promise<string> {
    if(!adminId){
        return (await System.findAll())[0].chapaSecretKey
    }
    return (await System.findOne({ where: { adminId } }))!.chapaSecretKey;
  }
}
