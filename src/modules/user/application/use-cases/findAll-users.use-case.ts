import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class FindAllUsersUseCase {
  constructor(
    @Inject('IUserRepository') private readonly repo: IUserRepository,
  ) {}
  async execute() {
    const users = await this.repo.findAll();
    return users;
  }
}
