import { User } from "../entities/User";



export interface UserRepository {
  createUser(userData: User): Promise<User | null>;
  findUserById(id: number): Promise<User | null>;
  findUserByPhone(phone: string): Promise<User | null>;
  getUsers(): Promise<Array<User>>;
  updateAccountInfo(account: User): Promise<User | null>;
  updateSubSongId(subSongId: number, id: number): Promise<boolean>;
  getAllUserBySubSongId(songId: number): Promise<User[]>;
  deleteAccount(accountId: number): Promise<boolean>;
}