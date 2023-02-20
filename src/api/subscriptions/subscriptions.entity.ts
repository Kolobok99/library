import {
  CreateDateColumn,
  Entity,
  OneToMany, OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { BooksEntity } from '../books/books.entity';
import { UsersEntity } from ".././users/users.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('subscriptions')
export class SubscriptionsEntity {

  @ApiProperty({type: Number, example: '1', description: 'Уникальный идентафикатор'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: '2023-12-12', description:'Дата покупки'})
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @OneToOne(() => UsersEntity, (user) => user.subscription)
  user: UsersEntity;

  @ApiProperty({type:[BooksEntity], description:'Взятые книги'})
  @OneToMany(() => BooksEntity, (book) => book.subscription)
  books: BooksEntity[];
}
