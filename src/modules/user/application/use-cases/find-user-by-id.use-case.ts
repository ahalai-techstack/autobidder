import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class FindUserByIdUseCase {
  constructor(
    @Inject('IUserRepository') private readonly repo: IUserRepository,
  ) {}

  async execute(id: string): Promise<User | null> {
    return await this.repo.findById(id);
  }
}
