export interface SystemRepository {
  getSystemStatus(adminId: number): Promise<"Active" | "Maintaince">;
  setSystemStatus(status: "Active" | "Maintaince", adminId: number): Promise<void>;
  setChapaSecretKey(key: string, adminId: number): Promise<void>;
  getChapaSecretkey(adminId: number): Promise<string>;
}
