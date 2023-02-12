import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RolesEntity } from '@app/modules/roles/roles.entity';
import { RoleCreateDto } from '@app/modules/roles/dto/role-create.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private readonly rolesRepository: Repository<RolesEntity>,
  ) {}

  async findOne(value: string): Promise<RolesEntity> {
    const role = this.rolesRepository.findOneBy({ value });
    if (!role) {
      throw new HttpException('role not found!', HttpStatus.NOT_FOUND);
    }
    return role;
  }
  async findAll(values: string[]): Promise<RolesEntity[]> {
    const roles = this.rolesRepository
      .createQueryBuilder('roles')
      .where('roles.value IN (:...values)', { values })
      .getMany();
    if (!roles) {
      throw new HttpException('roles not found!', HttpStatus.NOT_FOUND);
    }
    return roles;
  }

  async create(roleCreateDto: RoleCreateDto): Promise<RolesEntity> {
    const roleData = await this.rolesRepository.create(roleCreateDto);
    const role = await this.rolesRepository.save(roleData);
    return role;
  }
}
