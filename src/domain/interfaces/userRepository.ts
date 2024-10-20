import { User } from "../entities/User";



export interface UserRepository {
  createUser(userData: User): Promise<User | null>;
  findUserById(id: number): Promise<User | null>;
  findUserByPhone(phone: string): Promise<User | null>;
  getUsers():Promise<Array<User>>
  updateFirstName(data: { firstName: string; id: number }): Promise<boolean>;
  updateLastName(data: { lastName: string; id: number }): Promise<boolean>;
  updateSubSongId(subSongId: number,id:number): Promise<boolean>;
}