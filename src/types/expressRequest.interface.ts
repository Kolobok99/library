import { Request } from 'express';

import { UsersEntity } from '@app/users/users.entity';

export interface ExpressRequestInterface extends Request {
  user?: UsersEntity;
}
