import { AppError } from "../../domain/entities/AppError";
import { Role } from "../../domain/entities/Role";
import { RoleRepository } from "../../domain/interfaces/roleRepository";

export class RoleRepoImpl implements RoleRepository {
  async all(): Promise<Role[]> {
    return await Role.findAll();
  }
  async create(roleData: Role): Promise<Role | null> {
    const { name, allowedPages } = roleData;
    const [itemCreated, isCreated] = await Role.findOrCreate({ where: { name }, defaults: { name, allowedPages } });
    if (isCreated) return itemCreated;
    return null;
  }
  async findByName(roleName: string): Promise<Role | null> {
    return await Role.findOne({ where: { name: roleName } });
  }
  async update(roleData: Role): Promise<boolean> {
    const { name, allowedPages } = roleData;
    const numOfUpdated = await Role.update({ allowedPages }, { where: { name } });
    if (numOfUpdated[0] === 1) return true;
    return false;
  }
  async delete(name: string): Promise<boolean> {
    const numOfDel = await Role.destroy({ where: { name } });
    if (numOfDel === 1) return true;
    return false;
  }
  checkedAllowedPages(allowedPages: string[]): void {
    const validPages = ["Packages", "UserManagement", "Rewards", "Dashboard", "Payments", "Uploads", "SubscriptionPlans", "CRBTAds"];
    allowedPages.forEach((page) => {
      if (!validPages.includes(page)) {
        throw new AppError(`The value ${page} is not a valid value for allowedPages`, 400);
      }
    });
  }
}
