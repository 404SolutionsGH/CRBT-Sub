import { System } from "../entities/System";

export interface SystemRepository {
  getSystemStatus(adminId: number): Promise<"Active" | "Maintainance">;
  setSystemStatus(status: "Active" | "Maintainance", adminId: number): Promise<void>;
  setChapaSecretKey(key: string, adminId: number): Promise<void>;
  getChapaSecretkey(adminId: number): Promise<string>;
  updPointSettings(settings: System): Promise<void>;
}
