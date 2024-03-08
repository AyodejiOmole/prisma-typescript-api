import { db } from "../utils/db.server";

type Book = {
    id: string;
    title: string;
    isFiction: boolean;
    datePublished: Date;
}

export const listBooks = async (): Promise<Book[]> => {
    return db.book.findMany({
        select: {
            id: true,
            title: true,
            isFiction: true,
            datePublished: true,
        },
    });
};

export const getBook = async (id: string): Promise<Book | null> => {
    return db.book.findUnique({
        where: {
            id
        },
    });
};