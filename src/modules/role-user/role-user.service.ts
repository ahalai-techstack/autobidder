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

  async findUserRoles(userId: string): Promise<Role[]> {
    const roleUsers = await this.roleUserRepository.find({
      where: { user: { id: userId } },
      relations: ['role'],
    });
    return roleUsers.map((ru) => ru.role);
  }

  async findByUserId(userId: string) {
    const roleUser = await this.roleUserRepository.findOneBy({
      id: userId,
    });

    return roleUser;
  }

  async findUserRole(userId: string) {
    const roleUser = await this.roleUserRepository.findOneBy({
      userId: userId,
    });

    if (!roleUser) {
      throw new Error('User not found');
    }

    const role = await this.roleService.findById(roleUser.roleId);

    if (!role) {
      throw new Error('User role not found');
    }

    return role;
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
