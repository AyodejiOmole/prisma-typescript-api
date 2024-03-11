import express from "express";
import { db } from "../../utils/db.server";
import { body } from "express-validator";
import { getBooks, getBook, updateBook } from "../../controllers/book.controller";

export const bookRouter = express.Router();

bookRouter.get("/", getBooks);

bookRouter.get("/:id", getBook);

bookRouter.put(
    "/:id", 
    body("title").isString(), 
    body("datePublished").isDate(), 
    body("isFiction").isBoolean(),
    updateBook,
);

