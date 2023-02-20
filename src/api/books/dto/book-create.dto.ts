import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class BookCreateDto {
  @ApiProperty({type: String, example: 'Метро 2033', description: 'Название'})
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({type: String, example: 'постапокалиптический роман, описывающий жизнь людей в московском метро после ядерной войны на Земле.', description: 'Описание'})
  @IsOptional()
  @IsString()
  readonly description?: string;
}
