import { NextFunction, Request, Response } from "express";
import { booksDatabase } from "../database/database";
import { AppError } from "../errors/appError";

export class IsBookRepeated {
    static execute(req: Request, res: Response, next: NextFunction) {
        const bookId = req.params.id ? Number(req.params.id) : null;
        const bookName = req.body.name?.toLowerCase();

        const isRepeated = booksDatabase.some(book => book.name.toLowerCase() === bookName && book.id !== bookId);

        if (isRepeated) {
            throw new AppError(409, "Book already registered.");
        }
        next();
    }
}