import { IsArray, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserCreateDto {

  @ApiProperty({type: String, example: 'user123', description:'Никнэйм'})
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({type: String, example: '12345678', description:'Пароль'})
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({type: [String], example: `['ADMIN', 'USER']`, description:'Список ролей'})
  @IsOptional()
  @IsArray()
  readonly roles?: string[]
}
