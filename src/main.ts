import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import config from './config';
import tokenRouter from "./server/routes/tokenQueueServer";

const app = express();
const PORT = process.env.TOKEN_API_PORT || "4300";

const corsOptions = {credentials: true, origin: config.corsUrls};

app.use(bodyParser.json());
app.use(cors(corsOptions), bodyParser.urlencoded({extended: true}));
app.use('/', cors(corsOptions), tokenRouter, bodyParser.json());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
