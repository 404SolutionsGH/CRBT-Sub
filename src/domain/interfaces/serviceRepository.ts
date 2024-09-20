import { Service } from "../entities/Service";


export interface ServiceRepository {
  createService(serviceData: Service): Promise<Service | null>;
  findServiceById(id: number): Promise<Service | null>;
  findServiceWithIds(ids: Array<number>): Promise<Array<Service>>;
  findServiceByName(serviceName: string): Promise<Service | null>;
}