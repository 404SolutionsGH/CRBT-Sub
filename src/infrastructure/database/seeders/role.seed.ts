import { Role } from "../../../domain/entities/Role";

export const RoleSeeder = async () => {
  const data = [
    { name: "UserManager", allowedPages: ["UserManagement", "Rewards", "Dashboard"] },
    { name: "Song&SubscriptionManager", allowedPages: ["Uploads", "SubscriptionPlans", "Packages"] },
  ];
  await Role.bulkCreate(data);
};
