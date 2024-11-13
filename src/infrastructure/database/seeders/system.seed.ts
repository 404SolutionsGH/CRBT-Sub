import dotenv from "dotenv";
dotenv.config();
import { Admin } from "../../../domain/entities/Admin";
import { System } from "../../../domain/entities/System";

export const SystemSeeder = async () => {
  const { id } = (await Admin.findOne({ where: { adminType: "system" } }))!;
  await System.create({ adminId: id, chapaSecretKey: process.env.ChapaSecretKey, pointSettings: { songPoints: 2, minimumWithdraw: 100 } });
};
