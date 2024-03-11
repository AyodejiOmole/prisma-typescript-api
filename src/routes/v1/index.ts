import express from "express";
import { authorRouter } from "./author.router";
import { bookRouter } from "./book.route"

const app = express();

app.use("/author", authorRouter);
app.use("/book", bookRouter);


export default app;