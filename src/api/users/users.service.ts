import { hash } from 'bcrypt';
import { DeleteResult, Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';

import { UserResponseInterface } from '@app/api/users/types/user-response.interface';
import { UsersResponseInterface } from '@app/api/users/types/users-response.interface';
import { UsersEntity } from '@app/api/users/users.entity';
import { UserCreateDto } from '@app/api/users/dto/user-create.dto';

import { RolesService } from '@app/api/roles/roles.service';
import { SubscriptionsEntity } from '@app/api/subscriptions/subscriptions.entity';
import { UsersHelper } from "@app/api/users/users.helper";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private readonly roleService: RolesService,
    private readonly usersHelper: UsersHelper
  ) {}

  async findAll(): Promise<UsersEntity[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  async create(userCreateDto: UserCreateDto): Promise<UsersEntity> {
    const { username, password } = userCreateDto;
    const roles = await this.roleService.findAllByValues(userCreateDto.roles);
    const user = new UsersEntity();

    user.username = username;
    user.password = this.usersHelper.encodePassword(password);
    user.roles = [];
    user.roles.push(...roles)

    return await this.usersRepository.save(user);
  }

  async update(id: number, userUpdateDto: UserCreateDto): Promise<UsersEntity> {
    let user = await this.findOneBy('id', id);
    Object.assign(user, userUpdateDto)
    if (userUpdateDto.password){
      user.password = this.usersHelper.encodePassword(userUpdateDto.password)
    }
    user = await this.usersRepository.save(user);
    return user;
  }

  async delete(userID: number): Promise<DeleteResult> {
    const user = await this.findOneBy('id', userID);
    // console.log('!user.subscription?.books', !user.subscription.books)
    // console.log('user.subscription?.books', user.subscription.books)
    // console.log('user.subscription?.books.length', user.subscription.books.length)
    // console.log('!user.subscription?.books.length', !user.subscription.books.length)
    if (user.subscription?.books.length > 0) {
      throw new HttpException(
        'error: return the books',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else {
      return this.usersRepository.delete({ id: userID });
    }
  }

  async findOneBy(field: string, value: string | number): Promise<UsersEntity> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('user.subscription', 'subscription')
      .leftJoinAndSelect('subscription.books', 'books')
      .where(`user.${field}='${value}'`)
      .getOne();
    if (!user) {
      throw new NotFoundException(`user with ${field}=${value} not found!`)
    }
    return user;
  }

  async addRoles(
    user: UsersEntity,
    rolesString: string[],
  ): Promise<UsersEntity> {
    const roles = await this.roleService.findAllByValues(rolesString);
    if (!user.roles) {
      user.roles = [];
    }
    user.roles.push(...roles);
    return await this.usersRepository.save(user);
  }

  async setSubscription(user: UsersEntity, subscription: SubscriptionsEntity): Promise<UsersEntity> {
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

}
