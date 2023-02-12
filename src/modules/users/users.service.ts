import { DeleteResult, Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserResponseInterface } from '@app/modules/users/types/user-response.interface';
import { UsersResponseInterface } from '@app/modules/users/types/users-response.interface';
import { UsersEntity } from '@app/modules/users/users.entity';
import { UserCreateDto } from '@app/modules/users/dto/user-create.dto';

import { RolesService } from '@app/modules/roles/roles.service';
import { SubscriptionsEntity } from '@app/modules/subscriptions/subscriptions.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private readonly roleService: RolesService,
  ) {}

  async findAll(): Promise<UsersEntity[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  async create(
    userCreateDto: UserCreateDto,
    stringRoles: string[],
  ): Promise<UsersEntity> {
    const userData = await this.usersRepository.create(userCreateDto);
    const user = await this.usersRepository.save(userData);
    const userWithRoles = await this.addRoles(user, stringRoles);
    return userWithRoles;
  }

  async update(
    id: number,
    userUpdateDto: UserCreateDto,
  ): Promise<UsersEntity> {
    let user = await this.findByID(id);
    Object.assign(user, userUpdateDto);
    user = await this.usersRepository.save(user);
    return user;
  }

  async delete(userID: number): Promise<DeleteResult> {
    const user = await this.findByID(userID);
    if (user.subscription?.books) {
      throw new HttpException(
        'error: return the books',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else {
      return this.usersRepository.delete({ id: userID });
    }
  }

  async findByID(id: number): Promise<UsersEntity> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('user.subscription', 'subscription')
      .leftJoinAndSelect('subscription.books', 'books')
      .where(`user.id = :id`, { id })
      .getOne();
    if (!user) {
      throw new HttpException('user not found!', HttpStatus.NOT_FOUND);
    }
    return user;
  }
  async findByUserName(username: string): Promise<UsersEntity> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('user.subscription', 'subscription')
      .leftJoinAndSelect('subscription.books', 'books')
      .where(`user.username = :username`, { username })
      .getOne();
    if (!user) {
      throw new HttpException('user not found!', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async addRoles(
    user: UsersEntity,
    rolesString: string[],
  ): Promise<UsersEntity> {
    const roles = await this.roleService.findAll(rolesString);
    if (!user.roles) {
      user.roles = [];
    }
    user.roles.push(...roles);
    return await this.usersRepository.save(user);
  }

  async setSubscription(
    user: UsersEntity,
    subscription: SubscriptionsEntity,
  ): Promise<UsersEntity> {
    user.subscription = subscription;
    return await this.usersRepository.save(user);
  }

  async isUserSubscribed(userId: number): Promise<boolean> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.subscription', 'subscription')
      .where('user.id = :id', { id: userId })
      .getOne();

    return user.subscription !== null;
  }

  buildUserResponse(user: UsersEntity): UserResponseInterface {
    delete user.password;
    return { user };
  }

  buildUsersResponse(users: UsersEntity[]): UsersResponseInterface {
    users.map((user: UsersEntity) => {
      delete user.password;
      delete user.subscription;
    });
    return {
      users: {
        ...users,
      },
    };
  }
}
