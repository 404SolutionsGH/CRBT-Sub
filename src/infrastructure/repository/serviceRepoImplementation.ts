import { where } from "sequelize";
import { Service } from "../../domain/entities/Service";
import { ServiceRepository } from "../../domain/interfaces/serviceRepository";

export class ServiceRepoImp implements ServiceRepository {
  async createService(serviceData: Service): Promise<Service | null> {
    const { ownerId, serviceName, planeType, category } = serviceData;
    const [itemCreated, isCreated] = await Service.findOrCreate({
      where: { ownerId },
      defaults: {
        ownerId,
        serviceName,
        planeType,
        category,
      },
    });

    if (isCreated) return itemCreated;

    return null;
  }
  async findServiceById(id: number): Promise<Service | null> {
    return await Service.findByPk(id);
  }
  async findServiceByName(serviceName: string): Promise<Service | null> {
    return await Service.findOne({ where: { serviceName } });
  }

  async findServiceWithIds(ids: Array<number>): Promise<Array<Service>> {
    return await Service.findAll({ where: { id: ids } });
  }
}
