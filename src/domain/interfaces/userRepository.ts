import { User } from "../entities/User";



export interface UserRepository {
  createUser(userData:User): Promise<User | null>;
  findUserById(id: number): Promise<User | null>;
  findUserByPhone(phone: string): Promise<User | null>;
}