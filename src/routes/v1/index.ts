import express from "express";
import { authorRouter } from "./author.router";

const app = express();

app.use("/authors", authorRouter);


export default app;