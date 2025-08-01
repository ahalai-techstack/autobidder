import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async findById(id: string): Promise<Role | null> {
    return this.roleRepository.findOne({ where: { id } });
  }

  async findByName(name: string): Promise<Role | null> {
    return this.roleRepository.findOne({ where: { name } });
  }

  async create(data: { name: string; description?: string }): Promise<Role> {
    const role = this.roleRepository.create(data);
    return this.roleRepository.save(role);
  }

  async update(id: string, data: Partial<Role>): Promise<Role | null> {
    await this.roleRepository.update(id, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.roleRepository.delete(id);
  }

  // Helper method to check if a user has a specific role
  async userHasRole(userId: string, roleName: string): Promise<boolean> {
    const result = await this.roleRepository
      .createQueryBuilder('role')
      .innerJoin('users', 'user', 'user.role_id = role.id')
      .where('user.id = :userId', { userId })
      .andWhere('role.name = :roleName', { roleName })
      .getOne();

    return !!result;
  }

  // Helper method to get user's role
  async getUserRole(userId: string): Promise<Role | null> {
    const result = await this.roleRepository
      .createQueryBuilder('role')
      .innerJoin('users', 'user', 'user.role_id = role.id')
      .where('user.id = :userId', { userId })
      .getOne();

    return result;
  }
}
