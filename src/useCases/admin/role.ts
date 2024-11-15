import { AppError } from "../../domain/entities/AppError";
import { Role } from "../../domain/entities/Role";
import { RoleRepoImpl } from "../../infrastructure/repository/roleRepositoryImplementation";

export class RoleUseCases {
  roleRepo = new RoleRepoImpl();
  async createRole(roleData: Role): Promise<void> {
    this.roleRepo.checkedAllowedPages(roleData.allowedPages);
    const data = await this.roleRepo.create(roleData);
    if (!data) throw new AppError(`The role ${roleData.name} already exist`, 409);
  }

  async updateRole(roleData: Role): Promise<void> {
    this.roleRepo.checkedAllowedPages(roleData.allowedPages);
    const data = await this.roleRepo.update(roleData);
    if (!data) throw new AppError(`Update failed, the role ${roleData.name} does not exist`, 404);
  }

  async getRole(name: string): Promise<Role> {
    const data = await this.roleRepo.findByName(name);
    if (data) return data;
    throw new AppError(`No role with name ${name} exist`, 404);
  }

  async getAllRoles(): Promise<Role[]> {
    return await this.roleRepo.all();
  }

  async deleteRole(name: string): Promise<void> {
    const isDeleted = await this.roleRepo.delete(name);
    if (!isDeleted) throw new AppError(`Deletion failed, no role with name ${name} exist`, 404);
  }
}
