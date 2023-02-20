import { Injectable } from "@nestjs/common";
import { BooksEntity } from "@app/api/books/books.entity";
import { BookResponseInterface } from "@app/api/books/book-response.interface";

@Injectable()
export class BooksHelper {

  buildBookResponse(book: BooksEntity): BookResponseInterface {
    return {
      book: {
        title: book.title,
        description: book.description,
        subscription: { id: book.subscription?.id },
      },
    };
  }

}