import { System } from "../../domain/entities/System";
import { SystemRepository } from "../../domain/interfaces/systemRepository";

export class SystemRepoImpl implements SystemRepository {
  async getSysInfo() {
    return (await System.findAll({attributes:{exclude:["id","adminId"]}}))[0];
  }
  async updPointSettings(settings: System): Promise<void> {
    const { pointSettings, adminId } = settings;
    await System.update({ pointSettings }, { where: { adminId } });
  }
  async getSystemStatus(adminId: number | undefined): Promise<"Active" | "Maintainance"> {
    if (!adminId) {
      return (await System.findAll())[0].status;
    }
    return (await System.findOne({ where: { adminId } }))!.status;
  }
  async setSystemStatus(status: "Active" | "Maintainance", adminId: number): Promise<void> {
    await System.update({ status }, { where: { adminId } });
  }
  async setChapaSecretKey(key: string, adminId: number): Promise<void> {
    await System.update({ chapaSecretKey: key }, { where: { adminId } });
  }
  async getChapaSecretkey(adminId: number | undefined): Promise<string> {
    if (!adminId) {
      return (await System.findAll())[0].chapaSecretKey;
    }
    return (await System.findOne({ where: { adminId } }))!.chapaSecretKey;
  }
}
