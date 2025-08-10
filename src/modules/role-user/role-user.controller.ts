import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { RoleUserService } from './role-user.service';

@Controller('role-user')
export class RoleUserController {
  constructor(private readonly roleUserService: RoleUserService) {}

  @Get(':id')
  findAllUserRoles(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.roleUserService.findUserRoles(id);
  }
}
