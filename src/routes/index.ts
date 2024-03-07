import { Express } from "express";
import express from "express";
import version1 from "./v1"

const app: Express = express();

app.use("/v1", version1);

export default app;