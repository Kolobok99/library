import { Controller, Post, UseGuards } from '@nestjs/common';

import { SubscriptionsService } from '@app/api/subscriptions/subscriptions.service';
import { SubResponseInterface } from '@app/api/subscriptions/sub-response.interface';

import { User } from '@app/api/users/decorators/current.user.decorator';
import { UsersEntity } from '@app/api/users/users.entity';
import { AuthGuard } from '@app/api/auth/guards/auth.guard';
import { SubsHelper } from "@app/api/subscriptions/subs.helper";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BooksEntity } from "@app/api/books/books.entity";
import { SubscriptionsEntity } from "@app/api/subscriptions/subscriptions.entity";

@ApiTags('Абонементы')
@Controller('subs')
export class SubscriptionsController {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
    private readonly subsHelper: SubsHelper
  ) {}

  @ApiOperation({summary: 'Покупка абонемента текущем пользователем'})
  @ApiResponse({status: 201, type: SubscriptionsEntity})
  @Post()
  @UseGuards(AuthGuard)
  async create(@User() currentUser: UsersEntity): Promise<SubResponseInterface> {
    const sub = await this.subscriptionsService.create(currentUser);
    return this.subsHelper.buildSubResponse(sub);
  }
}
