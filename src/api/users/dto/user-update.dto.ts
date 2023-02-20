import { IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserUpdateDto {

  @ApiProperty({type: String, example: 'user123', description:'Никнэйм'})
  @IsOptional()
  readonly username: string;

  @ApiProperty({type: String, example: '12345678', description:'Пароль'})
  @IsOptional()
  readonly password: string;

}
