import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly repo: IUserRepository,
  ) {}

  async execute(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    const user = User.create(
      data.firstName,
      data.lastName,
      data.email,
      data.password,
    );
    await this.repo.save(user);
    return user;
  }
}
