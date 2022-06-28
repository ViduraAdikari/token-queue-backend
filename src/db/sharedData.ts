import {ISharedData} from "../types/types";
import {INIT_COUNTERS, INIT_SERVICES} from "../const/initData";

const sharedData: ISharedData = {
  services: INIT_SERVICES,
  counters: INIT_COUNTERS,
  tokenNumber: 1
}

module.exports = sharedData;