import { db } from "../src/utils/db.server";

type Author = {
    firstName: string;
    lastName: string;
}

type Book = {
    title: string;
    isFiction: boolean;
    datePublished: Date;
}

async function seed() {
    await Promise.all(
        getAuthors().map((author) => {
            return db.author.create({
                data: {
                    firstName: author.firstName,
                    lastName: author.lastName
                },
            });
        }),
    );

    const author = await db.author.findFirst({
        where: {
            firstName: "Oscar",
        },
    });

    await Promise.all(
        getBooks().map((book: Book) => {
            const { title, isFiction, datePublished } = book;
            return db.book.create({
                data: {
                    title,
                    isFiction,
                    datePublished,
                    authorId: author!.id,
                }
            });
        }),
    );
};

seed();

function getAuthors(): Array<Author> {
    return [
        {
            firstName: "Oscar",
            lastName: "Wilde"
        },
        {
            firstName: "Leo",
            lastName: "Toslstoy"
        },
        {
            firstName: "Vladimir",
            lastName: "Nabokov"
        },
    ]
}

function getBooks(): Array<Book> {
    return [
        {
            title: "De Profundis",
            isFiction: false,
            datePublished: new Date(),        
        },
        {
            title: "Why am I so clever",
            isFiction: false,
            datePublished: new Date(),        
        },
        {
            title: "The critic as an artist",
            isFiction: true,
            datePublished: new Date(),        
        },
    ]
}