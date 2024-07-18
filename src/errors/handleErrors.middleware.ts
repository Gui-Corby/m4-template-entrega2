import { AppError } from "./appError";
import { Request, Response } from "express";
import { NextFunction } from "express";

export class HandlerErrors {
    static execute(err: Error, req: Request, res: Response, next: NextFunction) {
        if (err instanceof AppError) {
            return res.status(err.statusCode).json({ error: err.message });
        } else {
            console.log(err);
            return res.status(500).json({ error: "Internal server error"})
        }
    }
}