import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserLoginDto {
  @ApiProperty({type: String, example: 'user123', description:'Никнэйм'})
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({type: String, example: '12345678', description:'Пароль'})
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
