  import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
  import { ApiProperty } from "@nestjs/swagger";

@Entity('roles')
export class RolesEntity {

  @ApiProperty({type: Number, example: '1', description: 'Уникальный идентафикатор'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({type: String, example: 'USER', description: 'Значение'})
  @Column({ unique: true })
  value: string;

  @ApiProperty({type: String, example: 'Обычный пользователь', description: 'Описание'})
  @Column({ nullable: true })
  description: string;

}