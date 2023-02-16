import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { SubscriptionsEntity } from '@app/modules/subscriptions/subscriptions.entity';

import { UsersEntity } from '@app/modules/users/users.entity';
import { UsersService } from '@app/modules/users/users.service';

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
      const subsData = await this.subscriptionRepository.create();
      const subscription = await this.subscriptionRepository.save(subsData);
      const userWithSub = await this.usersService.setSubscription(user, subscription);
      return userWithSub.subscription;
    }
  }

  async findOne(id: number): Promise<SubscriptionsEntity> {
    console.log('id в FindONE', id);
    const sub = await this.subscriptionRepository.findOne({
      where: { id },
      relations: { books: true },
    });
    console.log('Sub в FindONE', sub)
    if (!sub) {
      throw new HttpException('subscription not found', HttpStatus.NOT_FOUND);
    }
    return sub;
  }

  buildSubResponse(sub: SubscriptionsEntity) {
    return {
      subscription: sub,
    };
  }
}
