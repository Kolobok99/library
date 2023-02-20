import { SubscriptionsEntity } from '@app/api/subscriptions/subscriptions.entity';
import { BooksEntity } from "@app/api/books/books.entity";

export interface SubResponseInterface {
  id: number,
  books: BooksEntity[],
  user: {
    id: number
  }

}