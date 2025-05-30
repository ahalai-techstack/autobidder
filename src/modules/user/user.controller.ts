import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateUserDto } from './application/dto/create-user.dto';
import { UpdateUserDto } from './application/dto/update-user.dto';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { FindAllUsersUseCase } from './application/use-cases/findAll-users.use-case';
import { FindUserByIdUseCase } from './application/use-cases/find-user-by-id.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';
import { RemoveUserUseCase } from './application/use-cases/remove-user.use-case';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly removeUserUseCase: RemoveUserUseCase,
  ) {}

  @Get()
  async findAll() {
    return await this.findAllUsersUseCase.execute();
  }

  @Get(':id')
  find(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.findUserByIdUseCase.execute(id);
  }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return await this.createUserUseCase.execute(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.updateUserUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeUserUseCase.execute(id);
  }
}
