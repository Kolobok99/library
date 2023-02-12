import { Controller, Post, UseGuards } from '@nestjs/common';

import { SubscriptionsService } from '@app/modules/subscriptions/subscriptions.service';
import { SubResponseInterface } from '@app/modules/subscriptions/sub-response.interface';

import { User } from '@app/modules/users/decorators/current.user.decorator';
import { UsersEntity } from '@app/modules/users/users.entity';
import { AuthGuard } from '@app/guards/auth.guard';

@Controller('subs')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@User() currentUser: UsersEntity): Promise<SubResponseInterface> {
    const sub = await this.subscriptionsService.create(currentUser);
    return this.subscriptionsService.buildSubResponse(sub);
  }
}
