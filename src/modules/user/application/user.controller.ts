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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { FindAllUsersUseCase } from './use-cases/find-all-users.use-case';
import { FindUserByIdUseCase } from './use-cases/find-user-by-id.use-case';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';
import { RemoveUserUseCase } from './use-cases/remove-user.use-case';

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
