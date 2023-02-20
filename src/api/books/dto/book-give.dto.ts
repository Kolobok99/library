import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class BookGiveDto {

  @ApiProperty({type: Number, example: '1', description:'Уникальный идентификатор пользователя'})
  @IsNotEmpty()
  subID: number;
}
