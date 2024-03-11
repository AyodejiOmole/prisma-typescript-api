import express from "express";
import { body } from "express-validator";
import { getBooks, getBook, updateBook, createBook, deleteBook } from "../../controllers/book.controller";

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

bookRouter.post(
    "/",
    body("title").isString(), 
    body("datePublished").isDate(), 
    body("isFiction").isBoolean(),
    body("authorId").isString(),
    createBook,
);

bookRouter.delete("/:id", deleteBook);

