import { Ibook } from "../interfaces/books.interface";

export const booksDatabase: Ibook[] = [];
    let id = 0;
    
    export const generateBookId = () => {
        id++;
        return id;
    }

    export const resetBooksDatabase = () => {
        booksDatabase.length = 0;
    }
