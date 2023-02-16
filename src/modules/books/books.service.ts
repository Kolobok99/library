import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BooksEntity } from '@app/modules/books/books.entity';
import { BookCreateDto } from '@app/modules/books/dto/book-create.dto';
import { BookResponseInterface } from '@app/modules/books/book-response.interface';

import { SubscriptionsService } from '@app/modules/subscriptions/subscriptions.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BooksEntity)
    private readonly booksRepository: Repository<BooksEntity>,
    private readonly subsService: SubscriptionsService,
  ) {}

  async create(bookCreateDto: BookCreateDto) {
    const booksData = await this.booksRepository.create(bookCreateDto);
    const book = await this.booksRepository.save(booksData);
    return book;
  }

  async findOne(id: number) {
    const book = await this.booksRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.subscription', 'subs')
      .where('book.id = :id', { id })
      .getOne();
    return book;
  }

  async giveBook(subID: number, bookID: number): Promise<BooksEntity> {
    console.log('SubID в сервисе', subID)
    const sub = await this.subsService.findOne(subID);
    const book = await this.findOne(bookID);
    console.log('Sub в сервисе', sub)

    if (sub?.books.length > 4) {
      throw new HttpException(
        "you can't borrow more than 5 books",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    console.log('sub_id', book.subscription?.id)
    if (book.subscription?.id !== undefined) {
      throw new HttpException('book уже взята', HttpStatus.NOT_FOUND);
    }
    book.subscription = sub;
    return await this.booksRepository.save(book);
  }

  async returnBook(subID: number, bookID: number): Promise<BooksEntity> {
    const sub = await this.subsService.findOne(subID);
    const book = await this.findOne(bookID);

    if (book.subscription?.id !== sub.id) {
      throw new HttpException(
        "you don't have this book",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    book.subscription = null;
    return await this.booksRepository.save(book);
  }

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
