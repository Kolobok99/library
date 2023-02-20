import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserRegistrationDto {

  @ApiProperty({type: String, example: 'user123', description:'Никнэйм'})
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({type: String, example: '12345678', description:'Пароль'})
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;

}
