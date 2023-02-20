import { Observable } from 'rxjs';

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { ExpressRequestInterface } from '@app/api/types/expressRequest.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<ExpressRequestInterface>();
    if (request.user) {
      return true;
    }
    throw new HttpException('Not authenticate!', HttpStatus.UNAUTHORIZED);
  }
}
