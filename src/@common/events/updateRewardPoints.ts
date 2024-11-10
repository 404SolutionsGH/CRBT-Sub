import { Reward } from "../../domain/entities/Reward";
import { AdminRepoImp } from "../../infrastructure/repository/adminRepoImplementation";
import { RewardRepoImpl } from "../../infrastructure/repository/rewardRepoImplementation";
import { SystemRepoImpl } from "../../infrastructure/repository/systemRepoImplementation";
import { UserRepoImp } from "../../infrastructure/repository/userRepoImplemtation";
import { event } from "../constants/objects";

export const updateRewardPointsListener = () => {
  event.on("updateRewardPoints", async (rewardData: Reward) => {
    let email: string | undefined = "";
    let phone: string | undefined = "";
    const { accountId, accountType } = rewardData;
    const { get, createOrUpdate } = new RewardRepoImpl();
    const { getSysInfo } = new SystemRepoImpl();
    const { findAdminById } = new AdminRepoImp();
    const { findUserById } = new UserRepoImp();
    const { pointsToReward } = await getSysInfo();
    console.log("Updating a users reward points..");
    const prevRewardData = await get(rewardData.accountId);
    if (!prevRewardData) {
      email = accountType === "admin" ? (await findAdminById(accountId))!.email : undefined;
      phone = accountType === "user" ? (await findUserById(accountId))!.phone : undefined;
    } else {
      email = prevRewardData.email;
      phone = prevRewardData.phone;
    }
    await createOrUpdate(Reward.build({ accountId, email, phone, accountType, points: prevRewardData ? prevRewardData.points + pointsToReward : pointsToReward }));
    console.log("Points added");
  });
};
