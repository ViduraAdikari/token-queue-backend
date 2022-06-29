import {IService, ISharedData} from "../types/types";
import {RESPONSE_SUCCESS} from "../const/values";

const getSharedData = (): ISharedData => {
  return global.sharedData;
}

/**
 * set service to shared data after add or other future operations.
 * @param services - updated services list
 */
const setSharedServices = (services: IService[]) => {
  const sharedData: ISharedData = {...getSharedData(), services: services};
  global.sharedData = sharedData;
  return RESPONSE_SUCCESS;
}

/**
 * returns all service
 */
const getServices = (): IService[] => {
  const sharedData: ISharedData = getSharedData();
  return sharedData.services.map(({
                                    queue, assignedTokens,
                                    ...serviceAttributes
                                  }) => serviceAttributes);
}

/**
 * get service by serviceID
 * @param serviceID
 */
const findServiceByID = (serviceID: string): IService | undefined => {
  const services: IService[] = getSharedData().services;
  return services.find((service: IService) => service.id === serviceID);
}

/**
 * set updated service to storage
 * @param updatedService
 */
const setServiceToDB = (updatedService: IService) => {
  const services: IService[] = getSharedData().services.slice();
  const serviceIndex: number = services.findIndex((service: IService) => service.id === updatedService.id);

  if (serviceIndex < 0) {
    return;
  }

  services.splice(serviceIndex, 1, updatedService);

  return setSharedServices(services);
}

export {getServices, getSharedData, findServiceByID, setServiceToDB};