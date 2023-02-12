import { verify } from 'jsonwebtoken';

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { ExpressRequestInterface } from '@app/types/expressRequest.interface';
import { UsersService } from '@app/modules/users/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}

  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      console.log(1)
      req.user = null;
      next();
      return;
    }
    console.log(2)
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decode = verify(token, process.env.SECRET_KEY || 'strong_key');
      console.log('decode!');
      const user = await this.userService.findByID(decode.id);
      console.log(user)
      req.user = user;
      console.log(3)
    } catch (e) {
      console.log(e)
      req.user = null;
      console.log(4)
    }
    next();
  }
}
