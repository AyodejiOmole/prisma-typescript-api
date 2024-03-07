import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as AuthorService from "../services/author.service";

export const getAuthor = async (request: Request, response: Response) => {
    const id: string = request.params.id;
    try {
        const author = await AuthorService.getAuthor(id);
        if(author) {
            return response.status(200).json(author);
        }

        return response.status(404).json("Author could not be found!");
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
}
