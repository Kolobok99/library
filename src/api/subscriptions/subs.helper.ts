import { Injectable } from "@nestjs/common";
import { SubscriptionsEntity } from "@app/api/subscriptions/subscriptions.entity";
import { SubResponseInterface } from "@app/api/subscriptions/sub-response.interface";

@Injectable()
export class SubsHelper {

  buildSubResponse(sub: SubscriptionsEntity): SubResponseInterface {
    return {
      id: sub.id,
      books: sub.books,
      user: {
        id: sub.user.id
      }

    };
  }

}