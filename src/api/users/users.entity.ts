import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { SubscriptionsEntity } from '../subscriptions/subscriptions.entity';
import { RolesEntity } from '../roles/roles.entity';
import {ApiProperty} from "@nestjs/swagger";

@Entity('users')
export class UsersEntity {

  @ApiProperty({type: Number, example: '1', description: 'Уникальный идентафикатор'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'user123', description: 'Никнэйм'})
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @ApiProperty({type:SubscriptionsEntity, description: 'Абонемент'})
  @OneToOne(() => SubscriptionsEntity, (subscription) => subscription.user)
  @JoinColumn()
  subscription: SubscriptionsEntity;

  @ApiProperty({type:[RolesEntity], description: 'Абонемент'})
  @ManyToMany(() => RolesEntity)
  @JoinTable()
  roles: RolesEntity[];
}
