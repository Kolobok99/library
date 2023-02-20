import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { SubscriptionsEntity } from '../subscriptions/subscriptions.entity';
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class BooksEntity {

  @ApiProperty({type: Number, example: '1', description: 'Уникальный идентафикатор'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({type: String, example: 'Метро 2033', description: 'Название'})
  @Column({unique:true})
  title: string;

  @ApiProperty({type: String, example: 'постапокалиптический роман, описывающий жизнь людей в московском метро после ядерной войны на Земле.', description: 'Описание'})
  @Column({nullable:true})
  description: string;

  @ManyToOne(
    () => SubscriptionsEntity,
    (subscription) => subscription.books)
  subscription: SubscriptionsEntity;
}
