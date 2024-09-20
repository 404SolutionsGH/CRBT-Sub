import { User } from "../../domain/entities/User";
import { UserRepoImp } from "../../infrastructure/repository/userRepoImplemtation";





export const updateAccountInfo= async (newDate:User)=>{
    const userRepo= new UserRepoImp()
    const {firstName,lastName,id}=newDate
    let wasDataUpdated=false

    if(firstName){

        wasDataUpdated = await userRepo.updateFirstName({ firstName, id });
    }

    if(lastName){
         wasDataUpdated = await userRepo.updateLastName({ lastName, id });
    }

return wasDataUpdated
}