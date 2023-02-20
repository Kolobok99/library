import { Body, Controller, HttpException, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common";

import { BookCreateDto } from '@app/api/books/dto/book-create.dto';
import { BooksService } from '@app/api/books/books.service';
import { BookResponseInterface } from '@app/api/books/book-response.interface';

import { AuthGuard } from '@app/api/auth/guards/auth.guard';
import { AuthAdminGuard } from '@app/api/auth/guards/auth.admin.guard';
import { User } from '@app/api/users/decorators/current.user.decorator';
import { UsersEntity } from '@app/api/users/users.entity';
import {BookGiveDto} from "@app/api/books/dto/book-give.dto";
import { BooksHelper } from "@app/api/books/books.helper";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BooksEntity } from "@app/api/books/books.entity";

@ApiTags('Книги')
@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly booksHelper: BooksHelper,
  ) {}

  @ApiOperation({summary: 'Добавление новой книги'})
  @ApiResponse({status: 201, type: BooksEntity})
  @Post()
  @UseGuards(AuthAdminGuard)
  @UseGuards(AuthGuard)
  async create(@Body() bookCreateDto: BookCreateDto): Promise<BookResponseInterface> {
    const book = await this.booksService.create(bookCreateDto);
    return this.booksHelper.buildBookResponse(book);
  }

  @ApiOperation({summary: 'Выдача книги'})
  @ApiResponse({status: 200, type: BooksEntity})
  @Put('/:id/give')
  @UseGuards(AuthAdminGuard)
  @UseGuards(AuthGuard)
  async giveBook(@Body() sub: BookGiveDto, @Param('id') bookID: number): Promise<BookResponseInterface> {
    const book = await this.booksService.giveBook(sub.subID, bookID);
    return this.booksHelper.buildBookResponse(book);
  }

  @ApiOperation({summary: 'Возвращение книги'})
  @ApiResponse({status: 200, type: BooksEntity})
  @Put('/:id/return')
  @UseGuards(AuthGuard)
  async returnBook(@User() currentUser: UsersEntity, @Param('id') bookID: number): Promise<BookResponseInterface> {
    if (!currentUser.subscription) {
      throw new HttpException('Yoy don\'t have a sub', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const book = await this.booksService.returnBook(
      currentUser.subscription.id,
      bookID,
    );
    return this.booksHelper.buildBookResponse(book);
  }
}
