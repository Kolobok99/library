import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BooksEntity } from '@app/api/books/books.entity';
import { BookCreateDto } from '@app/api/books/dto/book-create.dto';

import { SubscriptionsService } from '@app/api/subscriptions/subscriptions.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BooksEntity)
    private readonly booksRepository: Repository<BooksEntity>,
    private readonly subsService: SubscriptionsService,
  ) {}

  async create(bookCreateDto: BookCreateDto): Promise<BooksEntity> {
    const booksData = await this.booksRepository.create(bookCreateDto);
    return await this.booksRepository.save(booksData);

  }

  async findOne(id: number): Promise<BooksEntity> {
    const book = await this.booksRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.subscription', 'subs')
      .where('book.id = :id', { id })
      .getOne();
    if (!book) {
      throw new HttpException('book not found', HttpStatus.NOT_FOUND);
    }
    return book;
  }

  async giveBook(subID: number, bookID: number): Promise<BooksEntity> {
    const sub = await this.subsService.findOne(subID);
    const book = await this.findOne(bookID);

    if (sub?.books.length > 4) {
      throw new HttpException(
        "you can't borrow more than 5 books",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (book?.subscription?.id !== undefined) {
      throw new HttpException('book already in use', HttpStatus.NOT_FOUND);
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

}
