import {
  Controller,
  Get,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from '../auth/types/jwt-payload.type';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return users;
  }

  @Get('me')
  async findMe(@CurrentUser() user: JwtPayload) {
    const userData = await this.userService.findOne(user.sub);
    return userData;
  }

  @Get('role-test')
  @Roles('admin', 'user')
  @UseGuards(RolesGuard)
  roleTest(@CurrentUser() user: JwtPayload) {
    return user;
  }

  @Get(':id')
  find(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = this.userService.findOne(id);
    return user;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
