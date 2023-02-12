import { Observable } from 'rxjs';

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { ExpressRequestInterface } from '@app/types/expressRequest.interface';

@Injectable()
export class AuthAdminOrUser implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<ExpressRequestInterface>();
    const currentUserRoles = request.user.roles.map((role) => role.value);
    if (
      request.user.id == Number(request.params.id) ||
      currentUserRoles.includes('ADMIN')
    ) {
      return true;
    } else {
      throw new HttpException('Permission Denied!', HttpStatus.FORBIDDEN);
    }
  }
}
