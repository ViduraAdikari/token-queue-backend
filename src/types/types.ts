import Queue from "src/types/Queue";

export type IconTypes = 'document' | 'payment' | 'meet';

export type AvatarIcon = {
  icon: string
  color: string
  alt?: string
}

export interface IGuest {
  id: string
  phone: string
  avatar?: AvatarIcon
}

export interface IService {
  id: string
  icon: IconTypes
  title: string
  queue?: Queue<IToken>
  assignedTokens?: IToken[]
}

export interface ICounter {
  id: string
  serviceID: string
  servingToken: IToken | null
  isServing: boolean
}

export interface IToken {
  id: string
  tokenNumber: number
  serviceID: string
  counterID?: string
  time: Date
  customer: IGuest
  served: boolean
}

export interface ISharedData {
  services: IService[]
  counters: ICounter[]
  tokenNumber: number
}