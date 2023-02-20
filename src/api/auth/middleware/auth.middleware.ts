import { verify } from 'jsonwebtoken';

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { ExpressRequestInterface } from '@app/api/types/expressRequest.interface';
import { UsersService } from '@app/api/users/users.service';
import { AuthHelper } from "@app/api/auth/auth.helper";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private userService: UsersService,
    private authHelper: AuthHelper,
  ) {}

  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
     const authorization = req.headers?.authorization
     if (!authorization) {
       req.user = null;
       next();
       return
     }
     try {
     const token = authorization.split(' ')[1];
     const decode = await this.authHelper.decode(token);
     req.user = await this.userService.findOneBy('id', decode.id);
     }
     catch (e) {
       req.user = null
     }
    next()
    }
}