import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as AuthorService from "../../services/author.service";
import { getAuthor } from "../../controllers/author.controller";

export const authorRouter = express.Router();

// GET all authors on the database
authorRouter.get("/", async (request: Request, response: Response) => {
    try {
        const authors = await AuthorService.listAuthors();
        return response.status(200).json(authors);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

// // GET a specific author on the database
// authorRouter.get("/:id", async (request: Request, response: Response) => {
//     const id: string = request.params.id;
//     try {
//         const author = await AuthorService.getAuthor(id);
//         if(author) {
//             return response.status(200).json(author);
//         }

//         return response.status(404).json("Author could not be found!");
//     } catch (error: any) {
//         return response.status(500).json(error.message);
//     }
// });

authorRouter.get("/:id", getAuthor)

//POST: Create an author
// Params: firstName, lastName
authorRouter.post(
    "/", 
    body("firstName").isString(), 
    body("lastName").isString(), 
    async (request: Request, response: Response) => {
        const erros = validationResult(request);
        if(!erros.isEmpty()) {
            return response.status(400).json({ errors: erros.array() });
        }

        try {
            const author = request.body;
            const newAuthor = await AuthorService.createAuthor(author);
            return response.status(201).json(newAuthor);
        } catch(error: any) {
            return response.status(500).json(error.message);
        }
});

// Update the details a specific author on the database
// authorRouter.put("/id", async)