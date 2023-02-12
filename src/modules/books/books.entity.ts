import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { SubscriptionsEntity } from '../subscriptions/subscriptions.entity';

@Entity()
export class BooksEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => SubscriptionsEntity, (subscription) => subscription.books)
  subscription: SubscriptionsEntity;
}
