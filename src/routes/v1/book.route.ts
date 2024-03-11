import express from "express";
import { db } from "../../utils/db.server";
import { body, validationResult } from "express-validator";
import { getBooks, getBook } from "../../controllers/book.controller";
// import { getBook } from "../../services/book.service";

const bookRouter = express.Router();

bookRouter.get("/", getBooks);

bookRouter.get("/:id", getBook);

