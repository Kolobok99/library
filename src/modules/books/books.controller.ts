import {Body, Controller, Param, Post, Put, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';

import { BookCreateDto } from '@app/modules/books/dto/book-create.dto';
import { BooksService } from '@app/modules/books/books.service';
import { BookResponseInterface } from '@app/modules/books/book-response.interface';

import { AuthGuard } from '@app/guards/auth.guard';
import { AuthAdminGuard } from '@app/guards/auth.admin.guard';
import { User } from '@app/modules/users/decorators/current.user.decorator';
import { UsersEntity } from '@app/modules/users/users.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthAdminGuard)
  @UseGuards(AuthGuard)
  async create(
    @Body('book') bookCreateDto: BookCreateDto,
  ): Promise<BookResponseInterface> {
    const book = await this.booksService.create(bookCreateDto);
    return this.booksService.buildBookResponse(book);
  }

  @Put('/:id/give')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthAdminGuard)
  @UseGuards(AuthGuard)
  async giveBook(
    @Body('subID') subID: number,
    @Param('id') bookID: number,
  ): Promise<BookResponseInterface> {
    const book = await this.booksService.giveBook(subID, bookID);
    return this.booksService.buildBookResponse(book);
  }

  @Put('/:id/return')
  @UseGuards(AuthGuard)
  async returnBook(
    @User() currentUser: UsersEntity,
    @Param('id') bookID: number,
  ) {
    const book = await this.booksService.returnBook(
      currentUser.subscription.id,
      bookID,
    );
    return this.booksService.buildBookResponse(book);
  }
}
