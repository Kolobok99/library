import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import {DeleteResult, Repository} from 'typeorm';
import {UserCreateDto} from "./dto/user-create.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async findAll(): Promise<UsersEntity[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  async findById(id: number): Promise<UsersEntity> {
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }

  async create(userCreateDto: UserCreateDto): Promise<UsersEntity> {
    const userData = await this.usersRepository.create(userCreateDto);
    const user = await this.usersRepository.save(userData);
    return user;
  }

  async delete(userID: number): Promise<DeleteResult> {
    const user = await this.findById(userID);
    return this.usersRepository.delete(user);
  }

  async update(
    userID: number,
    userUpdateDto: UserCreateDto,
  ): Promise<UsersEntity> {

    const user = await this.findById(userID);
    Object.assign(user, userUpdateDto);
    return await this.usersRepository.save(user);
  }
}
