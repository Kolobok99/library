import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RoleCreateDto {
  @ApiProperty({type: String, example: 'Значение', description:'Админ'})
  @IsNotEmpty()
  @IsString()
  readonly value: string;

  @ApiProperty({type: String, example: 'Описание', description:'Администратор'})
  @IsString()
  @IsOptional()
  readonly description?: string;
}
