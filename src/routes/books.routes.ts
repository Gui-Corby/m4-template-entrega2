import { Router } from "express";
import { BooksControllers } from "../controllers/books.controllers";
import { IsBookIdValid } from "../middlewares/isBookIdValid.middleware";
import { IsBookRepeated } from "../middlewares/isBookRepeated.middleware";
import { ValidateRequest } from "../middlewares/ValidateRequest.middleware";
import { createOrEditBookBodySchema } from "../schemas/products.schema";

export const booksRouter = Router();

const booksControllers = new BooksControllers();

booksRouter.post("/",ValidateRequest.execute({body: createOrEditBookBodySchema }), IsBookRepeated.execute, booksControllers.create);
booksRouter.get("/", booksControllers.getMany);
booksRouter.get("/:id", IsBookIdValid.execute, booksControllers.getOne);
booksRouter.delete("/:id", IsBookIdValid.execute, booksControllers.delete);
booksRouter.patch("/:id", IsBookIdValid.execute ,ValidateRequest.execute({
    body: createOrEditBookBodySchema
}) , IsBookRepeated.execute, booksControllers.update);
