import { IsNotEmpty } from 'class-validator';

export class BookCreateDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;
}
