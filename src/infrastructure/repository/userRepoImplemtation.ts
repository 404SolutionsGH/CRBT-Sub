import { where } from "sequelize";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/interfaces/userRepository";

export class UserRepoImp implements UserRepository {
  async getUsers(): Promise<Array<User>> {
    return await User.findAll();
  }
  async createUser(userData: User): Promise<User | null> {
    const { phone, langPref, firstName, lastName } = userData;
    const [itemCreated, isCreated] = await User.findOrCreate({
      where: { phone },
      defaults: {
        phone,
        langPref,
        firstName,
        lastName,
      },
    });

    if (isCreated) {
      return itemCreated;
    }

    return null;
  }
  async findUserById(id: number): Promise<User | null> {
    return await User.findByPk(id);
  }
  async findUserByPhone(phone: string): Promise<User | null> {
    return await User.findOne({ where: { phone } });
  }

  async updateAccountInfo(account: User): Promise<User | null> {
    const { firstName, lastName,id, accountBalance, phone, langPref } = account;
    const updatedData = await User.update({ firstName, accountBalance, phone, langPref ,lastName}, { where: { id } ,returning:true});
    if (updatedData[0] == 1) return updatedData[1][0];
    return null;
  }

  async updateSubSongId(subSongId: number, id: number): Promise<boolean> {
    const updatedData = await User.update({ subSongId }, { where: { id } });
    if (updatedData[0] == 1) return true;
    return false;
  }
}
