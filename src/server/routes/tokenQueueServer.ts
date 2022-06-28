import {Request, Response, Router} from "express";

const tokenRouter = Router();

//test api
tokenRouter.get('/test', (req: Request, res: Response) => {
  res.status(200).send("API running");
});

export default tokenRouter;