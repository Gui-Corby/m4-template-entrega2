import { booksDatabase, generateBookId } from "../database/database";
import { Ibook, TCreateBody, TUpdateBody } from "../interfaces/books.interface";

interface IbooksServices {
    create(body: TCreateBody): Ibook;
    getMany(name?: string, pages?: string, category?: string): Ibook[];
    getOne(id: string): Ibook;
    delete(id: string): void;
    update(body: TUpdateBody, id: string): Ibook;
}

export class BooksServices implements IbooksServices {
    create(body: TCreateBody): Ibook {
        const newBook: Ibook = {
            id: generateBookId(),
            name: body.name,
            pages: body.pages,
            category: body.category,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        booksDatabase.push(newBook);

        return newBook;
    }

    getMany(search?: string, name?: string, pages?: string, category?: string): Ibook[] {
        const booksList = booksDatabase.filter(book => {
            const nameRule = name ? book.name.toLowerCase().includes(name.toLowerCase()) : true;
            const categoryRule = category ? (book.category ? book.category.toLocaleLowerCase().includes(category.toLowerCase()) : false) : true;

            return nameRule && categoryRule;
        })

        return booksList;
    }

    getOne(id: string): Ibook {
        const book = booksDatabase.find((book) => book.id === Number(id)) as Ibook
        ;
        
        return book;
    
    }

    delete(id: string): void {
        const index = booksDatabase.findIndex(book => book.id === Number(id));

        booksDatabase.splice(index, 1);
    }

    update(body: Partial<TCreateBody>, id: string): Ibook {

        const currentBook = booksDatabase.find((book) => book.id === Number(id)) as Ibook;

        const newBook = { ...currentBook, ...body, updatedAt: new Date() };

        const index = booksDatabase.findIndex((book) => book.id === Number(id));

        booksDatabase.splice(index, 1, newBook);

        return newBook;
    }
}