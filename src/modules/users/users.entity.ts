import { hash } from 'bcrypt';

import {
  BeforeInsert,
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
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToOne(() => SubscriptionsEntity, { cascade: true })
  @JoinColumn()
  subscription: SubscriptionsEntity;

  @ManyToMany(() => RolesEntity)
  @JoinTable()
  roles: RolesEntity[];

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await hash(this.password, 10);
  }
}
