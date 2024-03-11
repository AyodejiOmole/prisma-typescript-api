import { Response, Request } from "express";
import * as BookService from "../services/book.service";
import { validationResult } from "express-validator";

// GET all books on the database.
export const getBooks = async (req: Request, res: Response) => {
    try {
        const books = await BookService.listBooks();

        if(books) {
            return res.status(200).json({
                status: 200,
                message: "Books retrieved!",
                data: books,
            });
        }

    } catch(error: any) {
        return res.status(500).json(error.message);
    };
};

// GET a specific book from the database using its id.
export const getBook = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
        const book = await BookService.getBook(id);

        if(!book) {
            return res.status(404).json({
                status: 404,
                message: "Could not find book.",
            });
        };

        return res.status(200).json({
            status: 200,
            message: "Book retrieved!",
            data: book,
        });

    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

// PUT: Update the details a specific author on the database
// Params: id (of the author to be updated)
// Body: title, isFiction, datePublished
export const updateBook = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const id: string = req.params.id;
    const book = req.body;

    try {
        const updatedBook = await BookService.updateBook(book, id);

        if(!updatedBook) {
            return res.status(400).json({
                status: 400,
                message: "Could not update book."
            });
        };

        return res.status(200).json({
            status: 200,
            message: "Book updated.",
            data: updatedBook,
        });
    } catch (error) {
        return res.status(500).json(error.message);
    };
};

// POST: Create an author
// Body: title, isFiction, datePublished, authorId
export const createBook = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const book = req.body;
    try {
        const createdBook = await BookService.createBook(book);

        if(!createdBook) {
            return res.status(400).json({
                status: 400,
                message: "Could not create your book."
            });
        };

        return res.status(201).json({
            status: 200,
            message: "Book has been created.",
            data: createdBook,
        });

    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export const deleteBook = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
        await BookService.deleteAuthor(id);
        return res.status(204).json("Book has been deleted!");
    } catch (error) {
        return res.status(500).json(error.message);
    }; 
}