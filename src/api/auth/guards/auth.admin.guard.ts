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
export class AuthAdminGuard implements CanActivate {
  canActivate (context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<ExpressRequestInterface>();

    const roles: string[] = request.user.roles.map((role) => role.value);
    if (roles.includes('ADMIN')) {
      return true;
    }
    throw new HttpException('Permission denied!', HttpStatus.FORBIDDEN);
  }
}
