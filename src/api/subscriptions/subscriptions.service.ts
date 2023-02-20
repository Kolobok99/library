import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { SubscriptionsEntity } from '@app/api/subscriptions/subscriptions.entity';

import { UsersEntity } from '@app/api/users/users.entity';
import { UsersService } from '@app/api/users/users.service';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(SubscriptionsEntity)
    private subscriptionRepository: Repository<SubscriptionsEntity>,
    private usersService: UsersService,
  ) {}

  async create(user: UsersEntity): Promise<SubscriptionsEntity> {
    const isSubscribed = await this.usersService.isUserSubscribed(user.id);
    if (isSubscribed) {
      throw new HttpException(
        'you already have an active subscription',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else {
      let sub = new SubscriptionsEntity();
      sub.user = user;
      sub = await this.subscriptionRepository.save(sub);
      return sub
    }
  }

  async findOne(id: number): Promise<SubscriptionsEntity> {
    const sub = await this.subscriptionRepository.findOne({
      where: { id },
      relations: { books: true },
    });
    if (!sub) {
      throw new HttpException('subscription not found', HttpStatus.NOT_FOUND);
    }
    return sub;
  }


}
