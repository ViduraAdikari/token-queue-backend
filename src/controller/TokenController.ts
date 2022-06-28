import {ICounter, IGuest, IService, ISharedData, IToken} from "../types/types";
import {findServiceByID, getSharedData, setServiceToDB} from "./ServiceController";
import {RESPONSE_SUCCESS} from "../const/values";
import Queue from "../types/Queue";

/**
 * increment token number by one after issuing.
 * @param tokenNumber
 */
const incrementTokenNumber = (tokenNumber: number) => {
  const sharedData: ISharedData = {...getSharedData(), tokenNumber: tokenNumber + 1};
  global.sharedData = sharedData;
  return RESPONSE_SUCCESS;
}

/**
 * return next token number to issue.
 */
const getNextTokenNumber = (): number => {
  const sharedData: ISharedData = getSharedData();
  return sharedData.tokenNumber;
}

/**
 * add a new token to the queue of the service type
 * @param serviceID
 * @param time
 * @param user
 */
const addToken = (serviceID: string, time: number, user: IGuest): IToken | null => {
  const service: IService | undefined = findServiceByID(serviceID);

  if (!service) {
    return null;
  }

  const tokenNumber: number = getNextTokenNumber();
  const newToken: IToken = {
    id: tokenNumber + '', tokenNumber: tokenNumber,
    serviceID: serviceID, customer: user, time: new Date(time), served: false
  };

  const queue: Queue<IToken> = service.queue ? service.queue : new Queue<IToken>();
  queue.enqueue(newToken);
  service.queue = queue;

  const response = setServiceToDB(service);

  if (response === RESPONSE_SUCCESS) {
    incrementTokenNumber(tokenNumber);
    return newToken;
  }

  return null;
}

/**
 * get counters for the serviceID that are online(isServing) and vacant with no token assigned now.
 * @param serviceID
 */
const getVacantCountersByService = (serviceID: string): ICounter[] => {
  const sharedData: ISharedData = getSharedData();
  return sharedData.counters.filter((counter: ICounter) =>
    counter.serviceID === serviceID && counter.isServing && counter.servingToken === null);
}

/**
 * assigned tokens from queue to vacant counters.
 * @param serviceID
 */
const assignTokenFromQueue = (serviceID: string): IToken[] | undefined => {
  const service: IService | undefined = findServiceByID(serviceID);
  if (!service.queue || service.queue.isEmpty) {
    return service.assignedTokens;
  }

  const vacantCounters: ICounter[] = getVacantCountersByService(serviceID);
  if (vacantCounters.length === 0) {
    return service.assignedTokens;
  }

  const counterToAssignToken: ICounter = vacantCounters[Math.floor(Math.random() * vacantCounters.length)];
  counterToAssignToken.servingToken = service.queue.dequeue();

  service.assignedTokens = service.assignedTokens ? service.assignedTokens.concat([counterToAssignToken.servingToken]) :
    [counterToAssignToken.servingToken];
  return service.assignedTokens;
}

/**
 * returns assigned tokens to display
 * @param serviceID
 */
const getAssignedTokensByService = (serviceID: string) => {
  const assignedTokens: IToken[] | undefined = assignTokenFromQueue(serviceID);

  if (!assignedTokens) {
    return null;
  }

  return assignedTokens;
}

export {addToken, getAssignedTokensByService};