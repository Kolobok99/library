import { IsNotEmpty } from 'class-validator';

export class RoleCreateDto {
  @IsNotEmpty()
  readonly value: string;

  @IsNotEmpty()
  readonly description: string;
}
