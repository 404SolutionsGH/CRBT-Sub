import { AppError } from "../../domain/entities/AppError";
import { Service } from "../../domain/entities/Service";
import { AdminRepoImp } from "../../infrastructure/repository/adminRepoImplementation";
import { ServiceRepoImp } from "../../infrastructure/repository/serviceRepoImplementation";

export const createService = async (ownerEmail: string, serviceInfo: Service) => {
  // find the admin with the provided email
  const { findAdminByEmail } = new AdminRepoImp();
  const adminAccount = await findAdminByEmail(ownerEmail);

  if (!adminAccount) throw new AppError("No admin account with this email exist", 404);
  serviceInfo.ownerId = adminAccount.id;

  // creating service
  const { createService } = new ServiceRepoImp();
  const newService = await createService(serviceInfo);

  if (!newService) throw new AppError("This account is already associated with a service", 409);
};
