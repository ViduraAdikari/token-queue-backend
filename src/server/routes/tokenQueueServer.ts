import {Request, Response, Router} from "express";
import * as sharedData from '../../db/sharedData';
import {ICounter, IService, IToken} from "../../types/types";
import {getServices} from "../../controller/ServiceController";
import {addToken, getAssignedTokensByService} from "../../controller/TokenController";
import {getCounterByID, getCounters, setServedToken} from "../../controller/CounterController";
import {RESPONSE_SUCCESS} from "../../const/values";

const tokenRouter = Router();

global.sharedData = sharedData['default'];

//test api
tokenRouter.get('/test', (req: Request, res: Response) => {
  res.status(200).send("API running");
});

//query services list
tokenRouter.get('/services', (req: Request, res: Response) => {
  const services: IService[] = getServices();
  res.status(200).json({'services': services});
});

//add new token to the selected service queue
tokenRouter.post('/token/:service', (req: Request, res: Response) => {
  const serviceID = req.params['service'];
  const {time, user} = req.body;

  const token: IToken | null = addToken(serviceID, time, user);

  if (!token) {
    res.status(500).json({'message': 'operation failed!'});
    return;
  }

  res.status(200).json({'token': token});
});

//tokens assigned to requested service.
tokenRouter.get('/tokens/:service', (req: Request, res: Response) => {
  const serviceID = req.params['service'];
  const tokens: IToken[] | null = getAssignedTokensByService(serviceID);
  res.status(200).json({'tokens': tokens});
});

//query counters list, additional service wrt. spec
tokenRouter.get('/counters', (req: Request, res: Response) => {
  const counters: ICounter[] = getCounters();
  res.status(200).json({'counters': counters});
});

//get counter by id
tokenRouter.get('/:counter', (req: Request, res: Response) => {
  const counterID = req.params['counter'];
  const counter: ICounter | undefined = getCounterByID(counterID);

  if (!counter) {
    res.status(500).json({'message': 'counter not found!'});
  }

  res.status(200).json({'counter': counter});
});

//agent submits served token number.
tokenRouter.post('/:counter', (req: Request, res: Response) => {
  const counterID = req.params['counter'];
  const {token} = req.body;

  const response: string | null = setServedToken(counterID, token);

  if (response !== RESPONSE_SUCCESS) {
    res.status(500).json({'message': 'operation failed!'});
    return;
  }

  res.status(200).json({'message': RESPONSE_SUCCESS});
});

export default tokenRouter;