import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleUser } from './role-user.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Role } from '../role/role.entity';
import { RoleService } from '../role/role.service';

@Injectable()
export class RoleUserService {
  constructor(
    @InjectRepository(RoleUser)
    private readonly roleUserRepository: Repository<RoleUser>,
    private readonly roleService: RoleService,
  ) {}

  async findByUserId(userId: string) {
    const roleUser = await this.roleUserRepository.findOneBy({
      id: userId,
    });

    return roleUser;
  }

  async findUserRoles(userId: string) {
    const userRoles = await this.roleUserRepository
      .createQueryBuilder('roleUser')
      .leftJoinAndSelect('roleUser.role', 'role')
      .where('roleUser.user_id = :userId', { userId })
      .getMany();

    return userRoles.map((r) => ({
      roleId: r.role.id,
      name: r.role.name,
    }));
  }

  async create(user: User, role: Role) {
    const exists = await this.roleUserRepository.findOne({
      where: {
        user,
        role,
      },
    });

    if (exists) {
      return exists;
    }

    const roleUser = this.roleUserRepository.create({
      user,
      role,
    });
    return await this.roleUserRepository.save(roleUser);
  }
}
