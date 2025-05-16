import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly users: UserService) {}

  @Get() findAll() {
    return this.users.findAll();
  }
  @Get(':id') find(@Param('id') id: number) {
    return this.users.findOne(id);
  }

  @Post()
  create(@Body() dto: any) {
    return this.users.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.users.update(id, dto);
  }

  @Delete(':id') remove(@Param('id') id: string) {
    return this.users.remove(id);
  }
}
