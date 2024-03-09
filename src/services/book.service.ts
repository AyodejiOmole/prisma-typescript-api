import { db } from "../utils/db.server";

type Book = {
    id: string;
    title: string;
    isFiction: boolean;
    datePublished: Date;
    authorId: string
}

export const listBooks = async (): Promise<Book[]> => {
    return db.book.findMany({
        select: {
            id: true,
            title: true,
            isFiction: true,
            datePublished: true,
            authorId: true,
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

export const createBook = async (book: Omit<Book, "id">): Promise<Book> => {
    const { title, isFiction, datePublished, authorId } = book;

    return db.book.create({
        data: {
            title,
            isFiction,
            datePublished,
            authorId,
        },
        select: {
            id: true,
            title: true,
            isFiction: true,
            datePublished: true,
            authorId: true,
        }
    });
};

export const updateBook = async (book: Omit<Book, "id">, id: string): Promise<Book> => {
    const { title, isFiction, datePublished } = book;

    return db.book.update({
        where: {
            id,
        },
        data: {
            title,
            isFiction,
            datePublished,
        },
        select: {
            id: true,
            title: true,
            isFiction: true,
            datePublished: true,
            createdAt: true,
            updatedAt: true,
            authorId: true,
        }
    });
};

export const deleteAuthor = async (id: string) => {
    return db.book.delete({
        where: {
            id,
        },
    });
},