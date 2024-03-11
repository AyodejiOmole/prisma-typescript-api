import { Response, Request } from "express";
import * as BookService from "../services/book.service";

// GET all books on the database
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
        return res.status(500).json("Could not retrieve books.");
    };
};

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
        return res.status(500).json("Author could not be found");
    }
};