import { Request } from 'express';
import { UsersEntity } from '@app/api/users/users.entity';

export interface ExpressRequestInterface extends Request {
  user?: UsersEntity;
}
