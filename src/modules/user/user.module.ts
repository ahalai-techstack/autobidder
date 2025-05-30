import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserSchema } from './infrastructure/typeorm/schemas/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './infrastructure/typeorm/repositories/user.repository.impl';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { FindAllUsersUseCase } from './application/use-cases/findAll-users.use-case';
import { FindUserByIdUseCase } from './application/use-cases/find-user-by-id.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';
import { RemoveUserUseCase } from './application/use-cases/remove-user.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  providers: [
    UserService,
    CreateUserUseCase,
    FindAllUsersUseCase,
    FindUserByIdUseCase,
    UpdateUserUseCase,
    RemoveUserUseCase,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
