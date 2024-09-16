import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/interfaces/userRepository";





export class UserRepoImp implements UserRepository {
  async createUser(userData:User): Promise<User | null> {
    const {phone,langPref,firstName,lastName}= userData;
    const [itemCreated,isCreated]= await User.findOrCreate({
        where:{phone},
        defaults:{
            phone,
            langPref,
            firstName,
            lastName
        }
    })

    if(isCreated){
        return itemCreated
    }

    return null

  }
  async findUserById(id: number): Promise<User | null> {

    return await User.findByPk(id)
  }
  async findUserByPhone(phone: string): Promise<User | null> {

    return await User.findOne({where:{phone}})
  }
}