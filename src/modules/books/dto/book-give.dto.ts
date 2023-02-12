import { IsNotEmpty } from 'class-validator';

export class BookGiveDto {
  @IsNotEmpty()
  id: number;
}
