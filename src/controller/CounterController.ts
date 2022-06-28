import {ICounter, IService, ISharedData, IToken} from "../types/types";
import {findServiceByID, getSharedData, setServiceToDB} from "./ServiceController";
import {RESPONSE_SUCCESS} from "../const/values";

/**
 * returns all counters
 */
const getCounters = (): ICounter[] => {
  const sharedData: ISharedData = getSharedData();
  return sharedData.counters;
};

/**
 * set all counters to storage
 * @param counters
 */
const setSharedCounters = (counters: ICounter[]) => {
  const sharedData: ISharedData = {...getSharedData(), counters: counters};
  global.sharedData = sharedData;
  return RESPONSE_SUCCESS;
}

/**
 * return counter by counterID from shared storage.
 * @param counterID
 */
const getCounterByID = (counterID: string): ICounter | undefined => {
  const sharedData: ISharedData = getSharedData();
  return sharedData.counters.find((counter: ICounter) => counter.id === counterID);
}

/**
 * set updatedCounter to storage
 * @param updatedCounter
 */
const setCounterToDB = (updatedCounter: ICounter) => {
  const counters: ICounter[] = getSharedData().counters.slice();
  const counterIndex: number = counters.findIndex((counter: ICounter) => counter.id === updatedCounter.id);

  if (counterIndex < 0) {
    return;
  }

  counters.splice(counterIndex, 1, updatedCounter);
  return setSharedCounters(counters);
}

/**
 * remove served token from assigned token in service
 * @param serviceID
 * @param tokenNumber
 */
const removeAssignedToken = (serviceID: string, tokenNumber: number) => {
  const service: IService | undefined = findServiceByID(serviceID);

  if (service || !service.assignedTokens) {
    return;
  }

  const assignedTokens = service.assignedTokens.slice();
  service.assignedTokens = assignedTokens.filter((token: IToken) => token.tokenNumber !== tokenNumber);
  const response = setServiceToDB(service);

  if (response === RESPONSE_SUCCESS) {
    return response;
  }

  return null;
}

/**
 * remvoe served token from assigned token, set counter vacant for next token in the queue.
 * @param counterID
 * @param tokenNumber
 */
const setServedToken = (counterID: string, tokenNumber: number) => {
  const counter: ICounter | undefined = getCounterByID(counterID);
  if (!counter) {
    return null;
  }

  let response = removeAssignedToken(counter.serviceID, tokenNumber);

  if (response !== RESPONSE_SUCCESS) {
    return null;
  }

  counter.servingToken = null;
  response = setCounterToDB(counter);

  if (response === RESPONSE_SUCCESS) {
    return response;
  }

  //transaction would be great.
  return null;
}

export {getCounters, setServedToken};