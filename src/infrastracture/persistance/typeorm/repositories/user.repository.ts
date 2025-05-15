import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from 'src/domain/repositories/user-repository';
import { UserSchema } from '../schemas/user.schema';
import { Repository } from 'typeorm';
import { User } from 'src/domain/entities/user.entity';

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    @InjectRepository(UserSchema) private readonly repo: Repository<User>,
  ) {}

  async findById(id: string): Promise<User | null> {
    return this.repo.findOne({ where: { id: id } });
  }
}
