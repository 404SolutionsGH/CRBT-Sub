import { Role } from "../entities/Role";

export interface RoleRepository {
  create(roleData: Role): Promise<Role | null>;
  findByName(roleName: string): Promise<Role | null>;
  all():Promise<Role[]>
  update(roleData: Role): Promise<boolean>;
  delete(name: string): Promise<boolean>;
  checkedAllowedPages(allowedPages: string[]): void;
}
