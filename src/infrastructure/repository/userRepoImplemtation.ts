import { where } from "sequelize";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/interfaces/userRepository";

export class UserRepoImp implements UserRepository {
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

  async updateFirstName(data: { firstName: string; id: number }): Promise<boolean> {
    const { firstName, id } = data;
    const updatedData = await User.update({ firstName }, { where: { id } });
    if (updatedData[0] == 1) return true;
    return false;
  }
  async updateLastName(data: { lastName: string; id: number }): Promise<boolean> {
    const { lastName, id } = data;
    const updatedData = await User.update({ lastName }, { where: { id } });
    if (updatedData[0] == 1) return true;
    return false;
  }
}
