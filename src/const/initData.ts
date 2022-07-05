import {ICounter, IService} from "../types/types";

export const INIT_SERVICES: IService[] = [
  {
    id: '1',
    icon: 'payment',
    title: 'Billing / Payments',
  },
  {
    id: '2',
    icon: 'document',
    title: 'Document Services',
  },
  {
    id: '3',
    icon: 'meet',
    title: 'Consultation',
  },
];

/**
 * 2 x Counters - Billing / Payments. (Counter 1 & 2)
 * 4 x Counters - Document Services. (Counter 3, 4, 5, & 6)
 * 1 x Counter - Consultation. (Counter 7 only)
 */
export const INIT_COUNTERS: ICounter[] = [
  {
    id: '1',
    serviceID: '1',
    servingToken: null,
    isServing: true,
  },
  {
    id: '2',
    serviceID: '1',
    servingToken: null,
    isServing: true,
  },
  {
    id: '3',
    serviceID: '2',
    servingToken: null,
    isServing: true,
  },
  {
    id: '4',
    serviceID: '2',
    servingToken: null,
    isServing: true,
  },
  {
    id: '5',
    serviceID: '2',
    servingToken: null,
    isServing: true,
  },
  {
    id: '6',
    serviceID: '2',
    servingToken: null,
    isServing: true,
  },
  {
    id: '7',
    serviceID: '3',
    servingToken: null,
    isServing: true,
  },
];